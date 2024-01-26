import { IGameMode } from '@src/types';
import TeamGame from '@assets/images/fats_game.png';
import SoloGame from '@assets/images/normal_game.png';

export const GameModes: IGameMode[] = [
  {
    image: TeamGame,
    name: 'TEAM GAME',
    description: 'Only 3 rounds! Be careful and give it your all!',
  },
  {
    image: SoloGame,
    name: 'SOLO GAME',
    description: 'Create your own animation from 5 frames!',
  },
];
