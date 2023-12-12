import { ReactNode } from 'react';
import { Typography } from '../..';
import styles from './card.module.scss';

interface CardProps {
  children: ReactNode;
  title?: string;
  headerElement?: ReactNode;
  className?: string;
}

const defaultProps: Partial<CardProps> = {
  title: '',
  headerElement: undefined,
  className: undefined,
};

export const Card = ({
  children,
  title,
  headerElement,
  className,
}: CardProps) => (
  <div
    className={[styles.card,className].join(' ')}
  >
    {(title || headerElement) && (
      <div className={styles.headerContainer}>
        {title && <Typography variant='h2'>{title}</Typography>}
        {headerElement ?? null}
      </div>
    )}
    {children}
  </div>
);

Card.defaultProps = defaultProps;
