import { IPlayer } from '@src/types';
import PlayerIconLeo from '@assets/images/player_icon_leo.png';
import PlayerIconFox from '@assets/images/player_icon_fox.png';
import PlayerIconTiger from '@assets/images/player_icon_tiger.png';
import PlayerIconEmpty from '@assets/images/player_icon_empty.png';

export const Players: IPlayer[] = [
  {
    icon: PlayerIconLeo,
    name: 'VLADIMIR',
    main: true,
    status: 'active',
    userId: '1',
  },
  {
    icon: PlayerIconFox,
    name: 'ALEXANDRA',
    main: false,
    status: 'active',
    userId: '2',
  },
  {
    icon: PlayerIconTiger,
    name: 'LEONID',
    main: false,
    status: 'empty',
    userId: '3',
  },
  {
    icon: PlayerIconEmpty,
    name: 'Empty',
    main: false,
    status: 'empty',
    userId: '4',
  },
  {
    icon: PlayerIconEmpty,
    name: 'Empty',
    main: false,
    status: 'empty',
    userId: '5',
  },
  {
    icon: PlayerIconEmpty,
    name: 'Empty',
    main: false,
    status: 'empty',
    userId: '6',
  },
];
