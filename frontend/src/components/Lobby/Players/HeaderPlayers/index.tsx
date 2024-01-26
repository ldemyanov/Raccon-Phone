import { FC } from 'react';
import { useAppSelector } from '@src/redux/store';
import { NameContainer } from '@components/UI/NameContainer';

export const HeaderPlayers: FC = () => {
  const { players } = useAppSelector((state) => state.lobby);

  return (
    <header>
      <NameContainer text={`PLAYERS ${players.length}`} />
    </header>
  );
};
