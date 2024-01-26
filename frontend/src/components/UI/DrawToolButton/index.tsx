import { FC, ReactNode } from 'react';
import styles from './styles.module.css';

interface DrawToolButtonProps {
  children: ReactNode;
  isDisabled: boolean;
  handler: () => void;
}

export const DrawToolButton: FC<DrawToolButtonProps> = ({ children, isDisabled, handler }) => {
  return (
    <button className={styles.drawToolButton} onClick={handler} disabled={isDisabled}>
      {children}
    </button>
  );
};
