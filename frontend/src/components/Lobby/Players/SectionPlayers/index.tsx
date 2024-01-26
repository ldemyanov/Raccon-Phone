import { FC } from 'react';
import { useAppSelector } from '@src/redux/store';
import Crown from '@assets/images/crown.png';
import UserIcon from '@assets/images/player.png';
import { KickButton } from '@components/UI/KickButton';
import styles from './styles.module.css';

export const SectionPlayers: FC = () => {
  const { players, self } = useAppSelector((state) => state.lobby);

  return (
    <section className={styles.wrapper}>
      {players.map((elem, index) => {
        const isPlayer = self.userId == elem.userId && !elem.main;

        return (
          <div
            key={index}
            className={`
              ${styles.wrapper_player}
              ${elem.status === 'active' && styles.active_player}
              ${elem.status === 'empty' && styles.empty_player}
            `}>
            <div className={styles.circle}>
              <img src={elem.icon} alt={elem.icon} className={styles.icon} />
            </div>
            <h4 className={styles.name}>{elem.name}</h4>
            {elem.main && (
              <div className={`${styles.circle} ${styles.indents}`}>
                <img src={Crown} alt="crown" />
              </div>
            )}
            {isPlayer && (
              <div className={`${styles.circle} ${styles.indents}`}>
                <img src={UserIcon} alt="usericon" />
              </div>
            )}
            {self.main && self.userId !== elem.userId && <KickButton userId={elem.userId} />}
          </div>
        );
      })}
    </section>
  );
};
