import { IRoute } from './types';
import { LoginPage } from './pages/LoginPage';
import { LobbyPage } from './pages/LobbyPage';
import { WritePage } from './pages/GamePages/WritePage';
import { DrawPage } from './pages/GamePages/DrawPage';
import { GuessPage } from './pages/GamePages/GuessPage';
import { SoloResultsPage } from './pages/GamePages/SoloGuessPage';
import { GameResultsPage } from './pages/GamePages/GameResultsPage';

export const routes: IRoute[] = [
  {
    id: 1,
    name: 'Login',
    path: '/',
    element: LoginPage,
  },
  {
    id: 2,
    name: 'Lobby',
    path: '/lobby',
    element: LobbyPage,
  },
  {
    id: 3,
    name: 'Write',
    path: '/game/write',
    element: WritePage,
  },
  {
    id: 4,
    name: 'Draw',
    path: '/game/draw',
    element: DrawPage,
  },
  {
    id: 5,
    name: 'Guess',
    path: '/game/guess',
    element: GuessPage,
  },
  {
    id: 6,
    name: 'GameResults',
    path: '/game/results',
    element: GameResultsPage,
  },
  {
    id: 7,
    name: 'SoloResults',
    path: '/game/solo-results',
    element: SoloResultsPage,
  },
];
