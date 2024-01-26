import { FC } from 'react';
import { NameContainer } from '@components/UI/NameContainer';
import styles from './styles.module.css';

interface HeaderAuthorizationProps {
  roomId: string;
}

export const HeaderAuthorization: FC<HeaderAuthorizationProps> = ({ roomId }) => {
  const headerText = roomId ? `${roomId.split('-')[1]} invite you in game!` : 'Create a game!';

  return (
    <header className={styles.header}>
      <NameContainer text={headerText} />
    </header>
  );
};
