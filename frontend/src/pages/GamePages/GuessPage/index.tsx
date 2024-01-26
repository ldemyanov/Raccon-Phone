import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { useNavigate } from 'react-router-dom';
import { ContentBorder } from '@components/UI/ContentBorder';
import { Tablet, TabletTitles } from '@components/Tablet';
import { Input, InputPlaceholders } from '@components/UI/Input';
import { Button, ButtonText } from '@components/UI/Button';
import { setIsReady, setSearchGuess, setSoloResponse } from '@src/redux/reducers/gameReducer';
import { GameProgress } from '@components/UI/GameInfo';
import { routes } from '@src/routes';
import useSocket from '@src/hooks/useSocket';

import styles from './styles.module.css';

export const GuessPage: FC = () => {
  const [soloStage, setSoloStage] = useState(0);
  const [textButton, setTextButton] = useState(ButtonText.ready);
  const { searchGuess, game, isReady } = useAppSelector((state) => state.game);
  const { self, isSolo, roomID } = useAppSelector((state) => state.lobby);
  const { sendResult } = useSocket();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const SoloResultsPage = routes[6];

  const [image, setImage] = useState('');

  useEffect(() => {
    if (!isSolo) {
      const [LoginPage] = routes;

      if (!roomID) navigate(LoginPage.path);
      setImage(() => {
        const words = game.words.filter((el) => el.responserId === self.userId);
        return words[0].img as string;
      });
    }
  }, []);

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchGuess(event.target.value));
    if (isSolo) {
      console.log('solo');
    }
  };

  const clickButton = () => {
    if (isSolo) {
      dispatch(
        setSoloResponse({
          index: soloStage,
          response: searchGuess,
        })
      );
      dispatch(setSearchGuess(''));

      if (soloStage < game.words.length - 1) {
        setSoloStage((soloStage) => soloStage + 1);
      } else {
        navigate(SoloResultsPage.path);
      }
    } else {
      textButton === ButtonText.ready ? setTextButton(ButtonText.change) : setTextButton(ButtonText.ready);
      sendResult({ response: searchGuess, responserId: self.userId, isResponserReady: !isReady });
      dispatch(setIsReady(!isReady));
    }
  };

  return (
    <ContentBorder>
      {isSolo ? (
        <GameProgress currentStage={soloStage + 1} totalStages={game.words.length} />
      ) : (
        <GameProgress
          currentStage={3}
          totalStages={3}
          readyPlayers={game.words.filter((el) => el.isResponserReady === true).length}
          totalPlayers={game.words.length}
        />
      )}
      <div className={styles.container}>
        {isSolo ? (
          <Tablet title={TabletTitles.guess} image={game.words[soloStage].img} />
        ) : (
          <Tablet title={TabletTitles.guess} image={image} />
        )}
        <div className={styles.row}>
          <Input
            placeholder={InputPlaceholders.guess}
            disabled={textButton === ButtonText.change}
            value={searchGuess}
            onChange={(event) => changeSearch(event)}
          />
          <Button text={textButton} onClick={clickButton} />
        </div>
      </div>
    </ContentBorder>
  );
};
