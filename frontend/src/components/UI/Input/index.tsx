import { FC } from 'react';

import styles from './styles.module.css';

interface InputProps {
  placeholder: string;
  disabled?: boolean;
  auth?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export enum InputPlaceholders {
  name = 'Your name',
  sentence = 'Write a sentence',
  guess = "What's in the picture?",
}

export const Input: FC<InputProps> = ({ placeholder, disabled, value, onChange, auth }) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      maxLength={auth ? 12 : 30}
    />
  );
};
