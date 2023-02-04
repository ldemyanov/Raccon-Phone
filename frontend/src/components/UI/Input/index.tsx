import { FC } from 'react';

import styles from './styles.module.css';

interface InputProps {
  placeholder: string;
}

export enum InputPlaceholders {
  name = 'Your name',
  sentence = 'Write a sentence',
}

export const Input: FC<InputProps> = ({ placeholder }) => {
  return <input className={styles.input} type="text" placeholder={placeholder} />;
};
