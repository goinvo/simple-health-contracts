import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors, typography as typographyTokens } from '@/src/theme/tokens';

type Variant = keyof typeof typographyTokens;
type Color = keyof typeof colors.text;

interface TypographyProps {
  children: React.ReactNode;
  variant?: Variant;
  color?: Color;
  style?: TextStyle | (TextStyle | undefined)[];
  numberOfLines?: number;
}

export function Typography({
  children,
  variant = 'body',
  color = 'primary',
  style,
  numberOfLines,
}: TypographyProps) {
  return (
    <Text
      style={[
        typographyTokens[variant],
        { color: colors.text[color] },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}
