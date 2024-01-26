import { TCanvasElement } from '@src/types';
import Tool from './Tool';
import getCanvasMousePosition from '@src/helpers/getCanvasMousePosition';
import getCanvasTouchPosition from '@src/helpers/getCanvasTouchPosition';

interface IPencil {
  isMouseDown: boolean;
  isTouching: boolean;
  path: Array<[x: number, y: number]> | null;
  saved: string;
  listen: () => void;
  onMouseDownHandler: (event: MouseEvent) => void;
  onMouseUpHandler: (event: MouseEvent) => void;
  onMouseMoveHandler: (event: MouseEvent) => void;
}

export default class Pencil extends Tool implements IPencil {
  public isMouseDown;
  public isTouching;
  public path: Array<[x: number, y: number]> | null;
  public saved;

  constructor(canvas: TCanvasElement) {
    super(canvas);
    this.listen();
    this.isMouseDown = false;
    this.isTouching = false;
    this.path = null;
    this.saved = '';
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

  public onMouseDownHandler(event: MouseEvent): void {
    this.isMouseDown = true;

    if (this.canvas) {
      const { xCoordinate, yCoordinate } = getCanvasMousePosition(event, this.canvas);
      this.path = [[xCoordinate, yCoordinate]];
      this.saved = this.canvas.toDataURL();
      this.ctx.beginPath();
      this.draw(xCoordinate, yCoordinate);
    }
  }

  public onMouseUpHandler(): void {
    this.isMouseDown = false;
  }

  public onMouseMoveHandler(event: MouseEvent): void {
    if (this.isMouseDown && this.canvas) {
      const { xCoordinate, yCoordinate } = getCanvasMousePosition(event, this.canvas);
      this.draw(xCoordinate, yCoordinate);
    }
  }

  public onMouseLeaveHandler(): void {
    this.isMouseDown = false;
  }

  public draw(xCoordinate: number, yCoordinate: number): void {
    if (this.saved) {
      const canvasImg = new Image();
      canvasImg.src = this.saved;
      this.path!.push([xCoordinate, yCoordinate]);
      canvasImg.onload = () => {
        if (this.canvas) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.drawImage(canvasImg, 0, 0, this.canvas.width, this.canvas.height);
          this.ctx.lineTo(xCoordinate, yCoordinate);
          this.ctx.stroke();
        }
      };
    }
  }

  public onTouchStartHandler(event: TouchEvent): void {
    event.preventDefault();
    this.isTouching = true;

    if (this.canvas) {
      const { xCoordinate, yCoordinate } = getCanvasTouchPosition(event, this.canvas);
      this.path = [[xCoordinate, yCoordinate]];
      this.saved = this.canvas.toDataURL();
      this.ctx.beginPath();
      this.draw(xCoordinate, yCoordinate);
    }
  }

  public onTouchMoveHandler(event: TouchEvent): void {
    console.log('Touch');
    if (this.isTouching && this.canvas) {
      const { xCoordinate, yCoordinate } = getCanvasTouchPosition(event, this.canvas);
      console.log(xCoordinate, yCoordinate);
      this.draw(xCoordinate, yCoordinate);
    }
  }

  public onTouchEndHandler(): void {
    this.isTouching = false;
  }
}
