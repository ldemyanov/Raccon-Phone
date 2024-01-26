import { TCanvasElement } from '@src/types';
import Tool from './Tool';
import getCanvasMousePosition from '@src/helpers/getCanvasMousePosition';
import { ICanvasMousePosition } from '@src/helpers/getCanvasMousePosition';
import getHexFromDecimal from '@src/helpers/getHexFromDecimal';
import getCanvasTouchPosition from '@src/helpers/getCanvasTouchPosition';

interface IPipette {
  isMouseDown: boolean;
  isTouching: boolean;
  color: string;
  opacity: string;
  listen: () => void;
  onMouseDownHandler: (event: MouseEvent) => void;
  onMouseUpHandler: (event: MouseEvent) => void;
}

export default class Pipette extends Tool implements IPipette {
  public isMouseDown;
  public isTouching;
  public color;
  public opacity;

  constructor(canvas: TCanvasElement) {
    super(canvas);
    this.isMouseDown = false;
    this.isTouching = false;
    this.color = '#000000';
    this.opacity = 'ff';
    this.listen();
  }

  public listen() {
    if (this.canvas) {
      this.canvas.onmousedown = this.onMouseDownHandler.bind(this);
      this.canvas.onmouseup = this.onMouseUpHandler.bind(this);
      this.canvas.onmouseleave = this.onMouseLeaveHandler.bind(this);

      this.canvas.ontouchstart = this.onTouchStartHandler.bind(this);
      this.canvas.ontouchend = this.onTouchEndHandler.bind(this);
    }
  }

  public onMouseDownHandler(event: MouseEvent) {
    if (this.canvas) {
      this.isMouseDown = true;
      this.getColor(getCanvasMousePosition(event, this.canvas));
      this.ctx.strokeStyle = this.color + this.opacity;
    }
  }

  public onMouseUpHandler() {
    this.isMouseDown = false;
  }

  public onMouseLeaveHandler() {
    this.isMouseDown = false;
  }

  public getColor({ xCoordinate, yCoordinate }: ICanvasMousePosition) {
    const [red, green, blue, opacity] = Array.from(this.ctx.getImageData(xCoordinate, yCoordinate, 1, 1).data);
    this.color = `#${getHexFromDecimal(red) + getHexFromDecimal(green) + getHexFromDecimal(blue)}`;
    if (this.color === '#000000' && opacity === 0) this.color = '#ffffff';
    this.opacity = getHexFromDecimal(opacity || 255);
  }

  public onTouchStartHandler(event: TouchEvent): void {
    if (this.canvas) {
      this.isTouching = true;
      this.getColor(getCanvasTouchPosition(event, this.canvas));
      this.ctx.strokeStyle = this.color + this.opacity;
    }
  }

  public onTouchEndHandler(): void {
    this.isTouching = false;
  }
}
