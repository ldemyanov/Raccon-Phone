import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { setTool } from '@src/redux/reducers/toolReducer';
import { drawToolsArray } from '@src/constants/Draw';
import { DrawToolButton } from '@components/UI/DrawToolButton';
import { undo, redo } from '@src/redux/reducers/canvasReducer';
import { UndoSVG } from '@components/SVG/Undo';
import { RedoSVG } from '@components/SVG/Redo';

import styles from './styles.module.css';

export const DrawTools: FC = () => {
  const dispatch = useAppDispatch();
  const { canvas, undoArr, redoArr } = useAppSelector((state) => state.canvas);
  const { isReady } = useAppSelector((state) => state.game);

  const undoClickHandler = () => {
    if (canvas && undoArr.length) {
      const ctx = canvas.getContext('2d');
      const dataUrl = undoArr[undoArr.length - 1];
      const canvasImg = new Image();
      if (dataUrl && ctx) {
        canvasImg.src = dataUrl;
        canvasImg.onload = () => {
          dispatch(undo(canvasImg));
        };
      }
    }
  };
  const redoClickHandler = () => {
    if (canvas && redoArr.length) {
      const ctx = canvas.getContext('2d');
      const dataUrl = redoArr[redoArr.length - 1];
      const canvasImg = new Image();
      if (dataUrl && ctx) {
        canvasImg.src = dataUrl;
        canvasImg.onload = () => {
          dispatch(redo(canvasImg));
        };
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {drawToolsArray.map((DrowTool, index) => {
        const handler = () => dispatch(setTool({ tool: new DrowTool.tool(canvas), toolName: DrowTool.toolName }));
        return (
          <DrawToolButton key={index} isDisabled={isReady} handler={handler}>
            <DrowTool.toolImg />
          </DrawToolButton>
        );
      })}
      <DrawToolButton isDisabled={isReady || undoArr.length === 0} handler={undoClickHandler}>
        <UndoSVG />
      </DrawToolButton>
      <DrawToolButton isDisabled={isReady || redoArr.length === 0} handler={redoClickHandler}>
        <RedoSVG />
      </DrawToolButton>
    </div>
  );
};
