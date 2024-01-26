import { TCanvasElement } from '@src/types';
import Tool from './Tool';
import getCanvasMousePosition from '@src/helpers/getCanvasMousePosition';
import { ICanvasMousePosition } from '@src/helpers/getCanvasMousePosition';
import getCanvasTouchPosition from '@src/helpers/getCanvasTouchPosition';

interface IEraser {
  isMouseDown: boolean;
  isTouching: boolean;
  currentColor: string;
  listen: () => void;
  onMouseDownHandler: (event: MouseEvent) => void;
  onMouseUpHandler: (event: MouseEvent) => void;
  onMouseMoveHandler: (event: MouseEvent) => void;
  onMouseLeaveHandler: (event: MouseEvent) => void;
}

export default class Eraser extends Tool implements IEraser {
  public isMouseDown;
  public isTouching;
  public currentColor;

  constructor(canvas: TCanvasElement) {
    super(canvas);
    this.listen();
    this.isMouseDown = false;
    this.isTouching = false;
    this.currentColor = '';
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
    this.isMouseDown = true;
    this.ctx.beginPath();
    this.currentColor = this.ctx.strokeStyle as string;
    this.ctx.strokeStyle = '#FCFFFD';

    if (this.canvas) {
      this.draw(getCanvasMousePosition(event, this.canvas));
    }
  }

  public onMouseUpHandler() {
    this.isMouseDown = false;
    this.ctx.strokeStyle = this.currentColor;
  }

  public onMouseMoveHandler(event: MouseEvent) {
    if (this.isMouseDown && this.canvas) {
      this.draw(getCanvasMousePosition(event, this.canvas));
    }
  }

  public onMouseLeaveHandler() {
    this.ctx.closePath();
    this.isMouseDown = false;
    this.ctx.strokeStyle = this.currentColor;
  }

  public draw({ xCoordinate, yCoordinate }: ICanvasMousePosition) {
    this.ctx.lineTo(xCoordinate, yCoordinate);
    this.ctx.stroke();
  }

  public onTouchStartHandler(event: TouchEvent): void {
    this.isTouching = true;

    this.ctx.beginPath();
    this.currentColor = this.ctx.strokeStyle as string;
    this.ctx.strokeStyle = '#FCFFFD';

    if (this.canvas) {
      this.draw(getCanvasTouchPosition(event, this.canvas));
    }
  }

  public onTouchMoveHandler(event: TouchEvent): void {
    if (this.isTouching && this.canvas) {
      this.draw(getCanvasTouchPosition(event, this.canvas));
    }
  }

  public onTouchEndHandler(): void {
    this.isTouching = false;
    this.ctx.strokeStyle = this.currentColor;
  }
}
