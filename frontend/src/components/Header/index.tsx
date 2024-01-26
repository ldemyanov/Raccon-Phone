import { FC } from 'react';
import logo from '@assets/images/logo.png';
import styles from './styles.module.css';
import { Sound } from '@components/Sound';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logo__img} src={logo} alt="Logo" />
        <h1 className={styles.logo__text}>
          Raccoon<br></br>Phone
        </h1>
      </div>
      <Sound />
    </header>
  );
};
