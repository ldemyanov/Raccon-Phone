import { FC, useEffect, useMemo, useState } from 'react';
import { Button, ButtonText } from '@components/UI/Button';
import { useAnonymousLogin } from '@src/hooks/useAnonymousLogin';
import styles from './styles.module.css';
import { useAppSelector } from '@src/redux/store';
import { getRoomPlayers } from '@src/api';
import { IPlayer } from '@src/types';

interface FooterAuthorizationProps {
  roomId: string;
}

export const FooterAuthorization: FC<FooterAuthorizationProps> = ({ roomId }) => {
  const { name } = useAppSelector((state) => state.auth);
  const login = useAnonymousLogin(roomId);
  const [chechUnicalName, setChechUnicalName] = useState(false);
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    if (roomId) {
      getRoomPlayers(roomId).then((res) => setPlayers(res));
    }
  }, []);

  useMemo(() => {
    setChechUnicalName(players.map((el) => el.name).includes(name));
  }, [name]);

  return (
    <footer className={styles.wrapper}>
      {chechUnicalName && <p className={styles.text}>This name is already taken</p>}
      <Button text={ButtonText.start} disabled={name.length < 1 || chechUnicalName} onClick={login} />
    </footer>
  );
};
