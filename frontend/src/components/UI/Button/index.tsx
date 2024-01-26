import { FC } from 'react';
import styles from './styles.module.css';

interface Button {
  text: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export enum ButtonText {
  start = 'start',
  ready = 'ready',
  unready = 'unready',
  begin = 'begin',
  invite = 'invite',
  change = 'change',
  copy = 'copied!',
}

export const Button: FC<Button> = ({ text, disabled, onClick }) => {
  return (
    <button className={`${styles.button} ${disabled && styles.disabled}`} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};
