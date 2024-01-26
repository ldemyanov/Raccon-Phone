import { FC, useEffect } from 'react';
import { ContentBorder } from '@components/UI/ContentBorder';
import { GameProgress } from '@components/UI/GameInfo';
import { Phone } from '@components/SVG/Phone';
import { Input, InputPlaceholders } from '@components/UI/Input';
import { Button, ButtonText } from '@components/UI/Button';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { setSearchWrite, setIsReady } from '@src/redux/reducers/gameReducer';
import { useNavigate } from 'react-router-dom';
import { routes } from '@src/routes';
import useSocket from '@src/hooks/useSocket';

import styles from './styles.module.css';

export const WritePage: FC = () => {
  const { searchWrite, isReady, game } = useAppSelector((state) => state.game);
  const { self, roomID } = useAppSelector((state) => state.lobby);
  const dispatch = useAppDispatch();
  const { sendWord } = useSocket();
  const navigate = useNavigate();

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchWrite(event.target.value));
  };

  const onClickHandler = () => {
    sendWord({ word: searchWrite, writerId: self.userId, isWriterReady: !isReady });
    dispatch(setIsReady(!isReady));
  };

  useEffect(() => {
    const [LoginPage] = routes;

    if (!roomID) navigate(LoginPage.path);
  }, []);

  return (
    <ContentBorder>
      <section className={styles.container}>
        <GameProgress
          currentStage={1}
          totalStages={3}
          readyPlayers={game.words.filter((el) => el.isWriterReady === true).length}
          totalPlayers={game.words.length}
        />
        <Phone />
        <h3 className={styles.title}>{isReady ? 'Waiting for other players' : 'Write a sentence'}</h3>
        <div className={styles.row}>
          <Input
            placeholder={InputPlaceholders.sentence}
            disabled={isReady}
            value={searchWrite}
            onChange={changeSearch}
          />
          <Button
            text={isReady ? ButtonText.change : ButtonText.ready}
            onClick={onClickHandler}
            disabled={!searchWrite}
          />
        </div>
      </section>
    </ContentBorder>
  );
};
