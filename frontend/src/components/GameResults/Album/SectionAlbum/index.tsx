import { useAppSelector } from '@src/redux/store';
import { IGameResults, setGameResult } from '@src/utils/GameResults';
import { FC, useEffect, useState } from 'react';

import styles from './styles.module.css';

interface ISectionAlbumProps {
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SectionAlbum: FC<ISectionAlbumProps> = ({ setIsButtonDisabled }) => {
  const { game } = useAppSelector((state) => state.game);
  const { players } = useAppSelector((state) => state.lobby);

  const GameResult = setGameResult(game, players);

  const [results, setResults] = useState<IGameResults[]>([]);

  useEffect(() => {
    let currentCount = 0;
    let playersCount = 0;
    const timer = setInterval(() => {
      if (currentCount < 3) {
        setResults((prev) => [...prev, GameResult[playersCount][currentCount++]]);
      } else {
        if (playersCount < players.length - 1) {
          setResults([]);
          currentCount = 0;
          playersCount = playersCount + 1;
        } else {
          setIsButtonDisabled(false);
          clearInterval(timer);
        }
      }
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      {results.map((elem, index) => {
        const isLeft = index % 2 === 0 ? styles.right : styles.left;
        return (
          <div key={index} className={`${styles.wrapper_player} ${isLeft}`}>
            <div className={styles.wrapper_icon}>
              <div className={styles.circle}>
                <img src={elem.icon} alt={elem.icon} className={styles.icon} />
              </div>
            </div>
            <h4 className={styles.name}>{elem.name}</h4>
            {index % 2 === 0 ? (
              <div className={styles.description}>{elem.description}</div>
            ) : (
              <div className={styles.description} style={{ backgroundImage: `url(${elem.description})` }} />
            )}
          </div>
        );
      })}
    </section>
  );
};
