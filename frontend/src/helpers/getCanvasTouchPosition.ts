import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@src/constants/Draw';

export interface ICanvasTouchPosition {
  xCoordinate: number;
  yCoordinate: number;
}

export default function getCanvasTouchPosition(event: TouchEvent, canvas: HTMLCanvasElement): ICanvasTouchPosition {
  const rect = canvas.getBoundingClientRect();
  const xCoordinate = (event.touches[0].clientX - rect.left) * (CANVAS_WIDTH / rect.width);
  const yCoordinate = (event.touches[0].clientY - rect.top) * (CANVAS_HEIGHT / rect.height);
  return { xCoordinate, yCoordinate };
}
