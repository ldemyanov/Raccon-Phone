import { FC, ReactNode } from 'react';
import styles from './styles.module.css';

interface ContainerProps {
  children: ReactNode;
  size?: string;
}

export const Container: FC<ContainerProps> = ({ children, size }) => {
  return (
    <section
      style={size === 'big' ? { width: `${70}%` } : size === 'small' ? { width: `${30}%` } : { width: `${50}%` }}
      className={styles.container}>
      {children}
    </section>
  );
};
