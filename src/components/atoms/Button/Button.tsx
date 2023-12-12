import { ReactNode } from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  children: string | ReactNode;
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

const defaultProps: Partial<ButtonProps> = {
  disabled: false,
  type: 'button',
  className: undefined,
};

export const Button = ({
  children,
  onClick,
  disabled,
  type,
  className,
}: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={[styles.button, className].join(' ')}
    type={type}
  >
    {children}
  </button>
);

Button.defaultProps = defaultProps;
