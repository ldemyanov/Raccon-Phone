import { FC, useEffect, useState } from 'react';
import { ContentBorder } from '@components/UI/ContentBorder';
import { GameProgress } from '@components/UI/GameInfo';
import { Pallete } from '@components/Draw/Pallete';
import { Tablet, TabletTitles } from '@components/Tablet';
import { DrawTools } from '@components/Draw/DrawTools';
import { BottomPanel } from '@components/Draw/BottomPanel';
import { useAppSelector } from '@src/redux/store';
import { useNavigate } from 'react-router-dom';
import { routes } from '@src/routes';

import styles from './styles.module.css';

export const DrawPage: FC = () => {
  const { game } = useAppSelector((state) => state.game);
  const { self, roomID } = useAppSelector((state) => state.lobby);
  const navigate = useNavigate();
  const [word, setWord] = useState('');

  useEffect(() => {
    const [LoginPage] = routes;

    if (!roomID) navigate(LoginPage.path);

    setWord(() => {
      const words = game.words.filter((el) => el.painterId === self.userId);
      return words[0].word as string;
    });
  }, []);

  return (
    <ContentBorder>
      <section className={styles.container}>
        <GameProgress
          currentStage={2}
          totalStages={3}
          readyPlayers={game.words.filter((el) => el.isPainterReady === true).length}
          totalPlayers={game.words.length}
        />
        <Pallete />
        <div className={styles.column}>
          <Tablet title={`${TabletTitles.draw} ${word}`} />
          <BottomPanel />
        </div>
        <DrawTools />
      </section>
    </ContentBorder>
  );
};
