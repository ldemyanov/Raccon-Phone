import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@src/constants/Draw';

export interface ICanvasMousePosition {
  xCoordinate: number;
  yCoordinate: number;
}

export default function getCanvasMousePosition(event: MouseEvent, canvas: HTMLCanvasElement): ICanvasMousePosition {
  const rect = canvas.getBoundingClientRect();
  const xCoordinate = (event.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
  const yCoordinate = (event.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);
  return { xCoordinate, yCoordinate };
}
