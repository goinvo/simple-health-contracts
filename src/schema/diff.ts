import { DynamicContract, ContractClause, ClauseDiff, ContractSection } from './types';

export interface DiffResult {
  fromVersion: string;
  toVersion: string;
  sections: SectionDiff[];
  summary: DiffSummary;
}

export interface SectionDiff {
  sectionId: string;
  title: string;
  clauses: (ContractClause & { diff: ClauseDiff })[];
  hasChanges: boolean;
}

export interface DiffSummary {
  totalClauses: number;
  added: number;
  modified: number;
  removed: number;
  unchanged: number;
  highImpactChanges: number;
}

export function diffContracts(
  oldContract: DynamicContract,
  newContract: DynamicContract
): DiffResult {
  const oldClauseMap = new Map<string, ContractClause>();
  for (const section of oldContract.sections) {
    for (const clause of section.clauses) {
      oldClauseMap.set(clause.id, clause);
    }
  }

  const newClauseIds = new Set<string>();
  const sections: SectionDiff[] = [];
  let added = 0;
  let modified = 0;
  let removed = 0;
  let unchanged = 0;
  let highImpactChanges = 0;

  for (const section of newContract.sections) {
    const diffClauses: (ContractClause & { diff: ClauseDiff })[] = [];
    let sectionHasChanges = false;

    for (const clause of section.clauses) {
      newClauseIds.add(clause.id);
      const oldClause = oldClauseMap.get(clause.id);

      if (!oldClause) {
        added++;
        sectionHasChanges = true;
        const diff: ClauseDiff = {
          changeType: 'added',
          impactSummary: clause.diff?.impactSummary || 'New clause added',
          impactLevel: clause.diff?.impactLevel || 'medium',
        };
        if (diff.impactLevel === 'high') highImpactChanges++;
        diffClauses.push({ ...clause, diff });
      } else if (
        oldClause.layers.legal !== clause.layers.legal ||
        oldClause.layers.plain !== clause.layers.plain
      ) {
        modified++;
        sectionHasChanges = true;
        const diff: ClauseDiff = {
          changeType: 'modified',
          previousLayers: oldClause.layers,
          impactSummary: clause.diff?.impactSummary || 'This clause has been modified',
          impactLevel: clause.diff?.impactLevel || 'medium',
        };
        if (diff.impactLevel === 'high') highImpactChanges++;
        diffClauses.push({ ...clause, diff });
      } else {
        unchanged++;
        diffClauses.push({
          ...clause,
          diff: { changeType: 'unchanged', impactLevel: 'none' },
        });
      }
    }

    sections.push({
      sectionId: section.id,
      title: section.title,
      clauses: diffClauses,
      hasChanges: sectionHasChanges,
    });
  }

  // Find removed clauses
  for (const [clauseId, clause] of oldClauseMap) {
    if (!newClauseIds.has(clauseId)) {
      removed++;
      const parentSection = oldContract.sections.find((s) =>
        s.clauses.some((c) => c.id === clauseId)
      );
      const existingSection = sections.find(
        (s) => s.sectionId === parentSection?.id
      );
      const removedClause = {
        ...clause,
        diff: {
          changeType: 'removed' as const,
          previousLayers: clause.layers,
          impactSummary: 'This clause has been removed',
          impactLevel: 'medium' as const,
        },
      };
      if (existingSection) {
        existingSection.clauses.push(removedClause);
        existingSection.hasChanges = true;
      }
    }
  }

  return {
    fromVersion: oldContract.version,
    toVersion: newContract.version,
    sections,
    summary: {
      totalClauses: added + modified + removed + unchanged,
      added,
      modified,
      removed,
      unchanged,
      highImpactChanges,
    },
  };
}
