import { IGame } from '@src/hooks/useSocket';
import { IPlayer } from '@src/types';

export interface IGameResults {
  icon: string;
  name: string;
  description: string;
}

export const setGameResult = (game: Omit<IGame, 'roomId'>, players: IPlayer[]) => {
  return game.words.map((el) => {
    const writerId = players.find((elem) => elem.userId === el.writerId);
    const painterId = players.find((elem) => elem.userId === el.painterId);
    const responserId = players.find((elem) => elem.userId === el.responserId);
    return [
      {
        icon: writerId?.icon as string,
        name: writerId?.name as string,
        description: el.word as string,
      },
      {
        icon: painterId?.icon as string,
        name: painterId?.name as string,
        description: el.img as string,
      },
      {
        icon: responserId?.icon as string,
        name: responserId?.name as string,
        description: el.response as string,
      },
    ];
  });
};
