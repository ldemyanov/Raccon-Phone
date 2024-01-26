import { FC } from 'react';
import { useAppSelector } from '@src/redux/store';

import styles from './styles.module.css';

export const FooterPlayers: FC = () => {
  const { players } = useAppSelector((state) => state.lobby);

  return (
    <>
      {players.length === 2 && (
        <footer className={styles.footer}>
          <span className={styles.text}>3 players required for team play</span>
        </footer>
      )}
    </>
  );
};
