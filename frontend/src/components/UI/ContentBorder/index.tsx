import { FC, ReactNode } from 'react';
import styles from './styles.module.css';

interface ContentBorderProps {
  children: ReactNode;
}

export const ContentBorder: FC<ContentBorderProps> = ({ children }) => {
  return <div className={styles.border}>{children}</div>;
};
