import { FC } from 'react';

import styles from './styles.module.css';

interface Props {
  text: string;
}

export const NameContainer: FC<Props> = ({ text }) => {
  return <h2 className={styles.name_container}>{text}</h2>;
};
