import { TCanvasElement } from '@src/types';

interface ITool {
  canvas: TCanvasElement;
  ctx: CanvasRenderingContext2D;
  removeEvents: () => void;
}

export default class Tool implements ITool {
  public canvas;
  public ctx;

  constructor(canvas: TCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas!.getContext('2d', {
      willReadFrequently: true,
    })!;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.removeEvents();
  }

  set strokeStyle(color: string) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
  }

  removeEvents() {
    if (this.canvas) {
      this.canvas.onmousedown = null;
      this.canvas.onmouseup = null;
      this.canvas.onmousemove = null;
      this.canvas.onmouseleave = null;

      this.canvas.ontouchstart = null;
      this.canvas.ontouchmove = null;
      this.canvas.ontouchend = null;
    }
  }
}
