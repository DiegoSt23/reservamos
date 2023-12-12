import { CSSProperties } from 'react';
import styles from './typography.module.scss';

interface TypographyProps {
  children: string | number;
  variant?: 'h1' | 'h2' | 'h3' | 'paragraph';
  style?: CSSProperties;
}

const defaultProps: Partial<TypographyProps> = {
  variant: 'paragraph',
  style: undefined,
};

export const Typography = ({ children, variant, style }: TypographyProps) => (
  <p className={styles[variant ?? 'paragraph']} style={style}>{children}</p>
);

Typography.defaultProps = defaultProps;
