import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { TCanvasElement } from '@src/types';
import { pushToUndo, setCanvas } from '@src/redux/reducers/canvasReducer';
import { setLineWidth, setOpacity, setStrokeStyle, setTool } from '@src/redux/reducers/toolReducer';
import { CANVAS_WIDTH, CANVAS_HEIGHT, ToolNames } from '@src/constants/Draw';
import Pencil from '@src/tools/Pencil';
import Pipette from '@src/tools/Pipette';
import Tool from '@src/tools/Tool';
import styles from './styles.module.css';
import getCursorStyle from '@src/helpers/getCursorStyle';

export const Canvas: FC = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<TCanvasElement>(null);
  const { tool, toolName, currentTrikness } = useAppSelector((state) => state.tool);
  const { isReady } = useAppSelector((state) => state.game);
  const cursorStyle = getCursorStyle(styles, currentTrikness, toolName);
  const canvasStyles = [styles.canvas, cursorStyle].join(' ');

  const canvasMouseDownHandler = () => {
    if (tool instanceof Pipette) {
      dispatch(setStrokeStyle(tool.color));
      dispatch(setOpacity(tool.opacity));
    } else {
      dispatch(pushToUndo(canvasRef.current!.toDataURL()));
    }
  };

  const canvasTouchStartHandler = () => {
    if (tool instanceof Pipette) {
      dispatch(setStrokeStyle(tool.color));
      dispatch(setOpacity(tool.opacity));
    } else {
      dispatch(pushToUndo(canvasRef.current!.toDataURL()));
    }
  };

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));
    if (isReady) {
      dispatch(setTool({ tool: new Tool(canvasRef.current), toolName: ToolNames.default }));
    } else {
      dispatch(setTool({ tool: new Pencil(canvasRef.current), toolName: ToolNames.pencil }));
    }

    dispatch(setLineWidth(currentTrikness));
  }, [isReady]);

  return (
    <canvas
      className={canvasStyles}
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onMouseDown={canvasMouseDownHandler}
      onTouchStart={canvasTouchStartHandler}
    />
  );
};
