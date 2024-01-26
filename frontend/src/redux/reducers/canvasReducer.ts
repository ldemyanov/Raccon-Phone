import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCanvasElement } from '@src/types';

interface ICanvasState {
  canvas: TCanvasElement;
  undoArr: string[];
  redoArr: string[];
}

const initialState: ICanvasState = {
  canvas: null,
  undoArr: [],
  redoArr: [],
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas: (state, action) => {
      state.canvas = action.payload;
    },
    pushToUndo(state, action: PayloadAction<string>) {
      state.undoArr.push(action.payload);
    },
    undo(state, action: PayloadAction<HTMLImageElement>) {
      if (state.canvas && state.undoArr.length > 0) {
        state.undoArr.pop();
        state.redoArr.push(state.canvas.toDataURL());
        const ctx = state.canvas.getContext('2d')!;
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
        ctx.drawImage(action.payload, 0, 0, state.canvas.width, state.canvas.height);
      }
    },
    redo(state, action: PayloadAction<HTMLImageElement>) {
      if (state.canvas && state.redoArr.length > 0) {
        state.redoArr.pop();
        state.undoArr.push(state.canvas.toDataURL());
        const ctx = state.canvas.getContext('2d')!;
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
        ctx.drawImage(action.payload, 0, 0, state.canvas.width, state.canvas.height);
      }
    },
  },
});

export const { setCanvas, pushToUndo, undo, redo } = canvasSlice.actions;

export default canvasSlice.reducer;
