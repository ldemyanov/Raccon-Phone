import useSocket from '@src/hooks/useSocket';
import { FC } from 'react';
import close from '@assets/images/close.png';

import styles from './styles.module.css';

interface Props {
  userId: string;
}

export const KickButton: FC<Props> = ({ userId }) => {
  const { excludeUser } = useSocket();
  const onClickHandler = () => {
    excludeUser(userId);
  };
  return (
    <button className={styles.kickButton} onClick={onClickHandler}>
      <img className={styles.kickButton__icon} src={close} alt="kick icon" />
    </button>
  );
};
