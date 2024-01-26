import { TCanvasElement } from '@src/types';
import Tool from './Tool';
import getCanvasMousePosition from '@src/helpers/getCanvasMousePosition';
import getCanvasTouchPosition from '@src/helpers/getCanvasTouchPosition';

interface IRect {
  isMouseDown: boolean;
  isTouching: boolean;
  startX: number;
  startY: number;
  saved: string | null;
  listen: () => void;
  onMouseDownHandler: (event: MouseEvent) => void;
  onMouseUpHandler: (event: MouseEvent) => void;
  onMouseMoveHandler: (event: MouseEvent) => void;
}

export default class Rect extends Tool implements IRect {
  public isMouseDown;
  public isTouching;
  public startX;
  public startY;
  public saved: string | null;

  constructor(canvas: TCanvasElement) {
    super(canvas);
    this.listen();
    this.isMouseDown = false;
    this.isTouching = false;
    this.startX = 0;
    this.startY = 0;
    this.saved = null;
  }

  public listen() {
    if (this.canvas) {
      this.canvas.onmousedown = this.onMouseDownHandler.bind(this);
      this.canvas.onmouseup = this.onMouseUpHandler.bind(this);
      this.canvas.onmousemove = this.onMouseMoveHandler.bind(this);
      this.canvas.onmouseleave = this.onMouseLeaveHandler.bind(this);

      this.canvas.ontouchstart = this.onTouchStartHandler.bind(this);
      this.canvas.ontouchmove = this.onTouchMoveHandler.bind(this);
      this.canvas.ontouchend = this.onTouchEndHandler.bind(this);
    }
  }

  public onMouseDownHandler(event: MouseEvent) {
    if (this.canvas) {
      this.isMouseDown = true;
      this.startX = getCanvasMousePosition(event, this.canvas).xCoordinate;
      this.startY = getCanvasMousePosition(event, this.canvas).yCoordinate;
      this.ctx.beginPath();
      this.saved = this.canvas.toDataURL();

      this.draw(this.startX, this.startY, 1, 1);
    }
  }

  public onMouseUpHandler() {
    this.ctx.closePath();
    this.isMouseDown = false;
  }

  public onMouseMoveHandler(event: MouseEvent) {
    if (this.isMouseDown && this.canvas) {
      const currentX = getCanvasMousePosition(event, this.canvas).xCoordinate;
      const currentY = getCanvasMousePosition(event, this.canvas).yCoordinate;
      const width = currentX - this.startX;
      const height = currentY - this.startY;

      this.draw(this.startX, this.startY, width, height);
    }
  }

  public onMouseLeaveHandler() {
    this.isMouseDown = false;
    this.ctx.closePath();
  }

  public draw(xCoordinate: number, yCoordinate: number, width: number, height: number) {
    if (this.saved) {
      const canvasImg = new Image();
      canvasImg.src = this.saved;
      canvasImg.onload = () => {
        if (this.canvas) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.drawImage(canvasImg, 0, 0, this.canvas.width, this.canvas.height);
          this.ctx.beginPath();
          this.ctx.strokeRect(xCoordinate, yCoordinate, width, height);
        }
      };
    }
  }

  public onTouchStartHandler(event: TouchEvent): void {
    if (this.canvas) {
      this.isTouching = true;
      this.startX = getCanvasTouchPosition(event, this.canvas).xCoordinate;
      this.startY = getCanvasTouchPosition(event, this.canvas).yCoordinate;
      this.ctx.beginPath();
      this.saved = this.canvas.toDataURL();

      this.draw(this.startX, this.startY, 1, 1);
    }
  }

  public onTouchMoveHandler(event: TouchEvent): void {
    if (this.isTouching && this.canvas) {
      const currentX = getCanvasTouchPosition(event, this.canvas).xCoordinate;
      const currentY = getCanvasTouchPosition(event, this.canvas).yCoordinate;
      const width = currentX - this.startX;
      const height = currentY - this.startY;

      this.draw(this.startX, this.startY, width, height);
    }
  }

  public onTouchEndHandler(): void {
    this.isTouching = false;
    this.ctx.closePath();
  }
}
