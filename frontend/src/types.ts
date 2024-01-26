import { FC } from 'react';

export interface IRoute {
  id: number;
  name: string;
  path: string;
  element: FC;
}

export interface IGitHub {
  path: string;
  name: string;
}

export interface IGameMode {
  image: string;
  name: string;
  description: string;
}

export interface IPlayer {
  icon: string;
  name: string;
  main: boolean;
  status: string;
  userId: string;
}

export type TCanvasElement = HTMLCanvasElement | null;
