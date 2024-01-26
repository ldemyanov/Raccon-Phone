import { Button } from '@components/UI/Button';
import { FC } from 'react';
import useSocket from '@src/hooks/useSocket';

import styles from './styles.module.css';

interface FooterPlayersProps {
  isButtonDisabled: boolean;
}

export const FooterPlayers: FC<FooterPlayersProps> = ({ isButtonDisabled }) => {
  const { resetGame } = useSocket();

  const onClickHandler = () => resetGame();

  return (
    <footer className={styles.footer}>
      <Button text="Back to Start" onClick={onClickHandler} disabled={isButtonDisabled} />
    </footer>
  );
};
