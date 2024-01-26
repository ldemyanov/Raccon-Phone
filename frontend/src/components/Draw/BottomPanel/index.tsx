import { FC } from 'react';
import { Trikness } from '@components/UI/Trickness';
import { OpacitySlider } from '@components/UI/OpacitySlider';
import { Button, ButtonText } from '@components/UI/Button';

import styles from './styles.module.css';
import useSocket from '@src/hooks/useSocket';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { setIsReady } from '@src/redux/reducers/gameReducer';
import { postCanvas } from '@src/api';

export const BottomPanel: FC = () => {
  const { sendImage } = useSocket();
  const dispatch = useAppDispatch();
  const { canvas } = useAppSelector((state) => state.canvas);
  const { isReady, game } = useAppSelector((state) => state.game);
  const { self } = useAppSelector((state) => state.lobby);

  const onClickHandler = async () => {
    const png = await postCanvas(canvas!);
    // const url = `${window.location.hostname}:${location.port}/img/${png.url}`;
    const words = game.words.filter((el) => el.painterId === self.userId);
    sendImage({ word: words[0].word, painterId: self.userId, img: png.url, isPainterReady: !isReady });
    dispatch(setIsReady(!isReady));
  };

  return (
    <div className={styles.wrapper}>
      <Trikness isDisabled={isReady} />
      <OpacitySlider isDisabled={isReady} />
      <Button text={isReady ? ButtonText.change : ButtonText.ready} onClick={onClickHandler} />
    </div>
  );
};
