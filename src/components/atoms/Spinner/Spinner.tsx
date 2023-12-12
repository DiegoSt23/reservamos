import styles from './spinner.module.scss';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
}

const defaultProps: SpinnerProps = {
  size: 'md',
  color: '#d7ad6e',
};

export const Spinner = ({ size, color }: SpinnerProps) => (
  <div className={styles.dots}>
    <div
      className={styles[size || 'md']}
      style={{ borderColor: color }}
    />
  </div>
);

Spinner.defaultProps = defaultProps;
