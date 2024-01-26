import { FC, useState, useEffect } from 'react';
import ready from '@assets/images/ready.png';
import styles from './styles.module.css';

interface GameInfoProps {
  currentStage: number;
  totalStages: number;
  readyPlayers?: number;
  totalPlayers?: number;
}

export const GameProgress: FC<GameInfoProps> = ({ currentStage, totalStages, readyPlayers, totalPlayers }) => {
  const [iconStyles, setIconStyles] = useState([styles.playersReady__icon]);

  useEffect(() => {
    iconStyles.push(styles.animate);
    setIconStyles([styles.playersReady__icon, styles.animate]);
    setTimeout(() => setIconStyles([styles.playersReady__icon]), 1000);
  }, [readyPlayers]);

  return (
    <div className={styles.gameInfo}>
      <span className={styles.gameProgress}>{`${currentStage} / ${totalStages}`}</span>
      {totalPlayers && (
        <span className={styles.playersReady}>
          <img className={iconStyles.join(' ')} src={ready} alt="ready icon" />
          <span className={styles.playersReady__text}>{`${readyPlayers}/${totalPlayers}`}</span>
        </span>
      )}
    </div>
  );
};
