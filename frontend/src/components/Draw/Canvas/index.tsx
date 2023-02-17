import { FC, useEffect, useRef,} from 'react';
import { TCanvasElement } from '@src/types';
import { pushToUndo, setCanvas } from '@src/redux/reducers/canvasReducer';
import { setLineWidth, setOpacity, setStrokeStyle, setTool } from '@src/redux/reducers/toolReducer';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@src/constants/Draw';
import Pencil from '@src/tools/Pencil';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import Pipette from '@src/tools/Pipette';
import styles from './styles.module.css';
import getCursorStyle from '@src/helpers/getCursorStyle';

export const Canvas: FC = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<TCanvasElement>(null);
  const { tool, currentTrikness } = useAppSelector((state) => state.tool);
  const cursorStyle = getCursorStyle(styles, currentTrikness, tool);
  const canvasStyles = [styles.canvas, cursorStyle].join(' ');

  const canvasMouseDownHandler = () => {
    if (tool instanceof Pipette) {
      dispatch(setStrokeStyle(tool.color));
      dispatch(setOpacity(tool.opacity));
    } else {
      dispatch(pushToUndo(canvasRef.current!.toDataURL()));
    }
  };

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));
    dispatch(setTool(new Pencil(canvasRef.current)));
    dispatch(setLineWidth(currentTrikness));
  }, []);

  return (
    <canvas
      className={canvasStyles}
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onMouseDown={canvasMouseDownHandler}
    />
  );
};