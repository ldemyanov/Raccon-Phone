import { FC, ReactNode } from 'react';
import styles from './styles.module.css';

interface ContainerProps {
  children: ReactNode;
  disabled?: boolean;
}

export const ContainerGameMode: FC<ContainerProps> = ({ children, disabled }) => {
  return (
    <button className={`${styles.container} ${!disabled && styles.active}`} disabled={disabled}>
      {children}
    </button>
  );
};
