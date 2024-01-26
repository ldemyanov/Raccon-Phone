import { FC, useState } from 'react';
import { Button, ButtonText } from '@components/UI/Button';
import styles from './styles.module.css';
import { IRoute } from '@src/types';
import { routes } from '@src/routes';
import { useAppSelector } from '@src/redux/store';
import useSocket from '@src/hooks/useSocket';

export const FooterGameMode: FC = () => {
  const [LoginPage]: IRoute[] = routes;
  const { players, roomID, self } = useAppSelector((state) => state.lobby);
  const isSomeoneNotReady = players.some((player) => player.status === 'empty');
  const isBeginAvaliable = players.length === 1 ? false : isSomeoneNotReady || players.length < 3;

  const { setStatus, startGame } = useSocket();
  const startGameOnClickHandler = () => {
    startGame({ isGameStarted: true });
  };
  const readyOnClickHandler = () => {
    setStatus(self.status === 'active' ? 'empty' : 'active');
  };

  const [copy, setCopy] = useState(false);
  const copyLink = () => {
    setCopy(true);
    if (navigator?.clipboard?.writeText) {
      navigator?.clipboard?.writeText(`${window.location.hostname}:${location.port}${LoginPage.path}?roomId=${roomID}`);
    } else {
      alert("Copy doesn't work on http!");
    }
    setTimeout(() => setCopy(false), 800);
  };

  return (
    <footer className={styles.wrapper}>
      <Button text={copy ? ButtonText.copy : ButtonText.invite} onClick={copyLink} />
      {self.main ? (
        <Button text={ButtonText.begin} disabled={isBeginAvaliable} onClick={startGameOnClickHandler} />
      ) : (
        <Button text={self.status === 'active' ? ButtonText.unready : ButtonText.ready} onClick={readyOnClickHandler} />
      )}
    </footer>
  );
};
