import styles from './input.module.scss';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const Input = ({ value, onChange, placeholder }: InputProps) => (
  <input
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    className={styles.input}
  />
);