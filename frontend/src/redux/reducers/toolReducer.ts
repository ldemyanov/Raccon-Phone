import { createSlice } from '@reduxjs/toolkit';
import { triknessesValues, TTools, ToolNames } from '@src/constants/Draw';
import { palleteColors } from '@src/constants/Pallete';

interface IToolsState {
  tool: TTools | null;
  toolName: ToolNames;
  triknesses: number[];
  currentTrikness: number;
  colors: string[];
  currentColor: string;
  opacity: string;
}

const initialState: IToolsState = {
  tool: null,
  toolName: ToolNames.pencil,
  triknesses: triknessesValues,
  currentTrikness: triknessesValues[2],
  colors: palleteColors,
  currentColor: '#000000',
  opacity: 'ff',
};

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action) => {
      state.tool = action.payload.tool;
      state.tool!.strokeStyle = state.currentColor + state.opacity;
      state.toolName = action.payload.toolName;
    },
    setStrokeStyle: (state, action) => {
      if (state.tool) {
        state.tool.strokeStyle = action.payload + state.opacity;
        state.currentColor = action.payload;
      }
    },
    setLineWidth: (state, action) => {
      if (state.tool) {
        state.tool.lineWidth = action.payload;
        state.currentTrikness = Number(action.payload);
      }
    },
    setOpacity: (state, action) => {
      if (state.tool) {
        state.tool.strokeStyle = state.currentColor + action.payload;
        state.opacity = action.payload;
      }
    },
    resetTools: (state, action) => {
      if (state.tool && action.payload) {
        state.tool = null;
        state.triknesses = triknessesValues;
        state.currentTrikness = triknessesValues[2];
        state.currentColor = '#000000';
        state.opacity = 'ff';
      }
    },
  },
});

export const { setTool, setStrokeStyle, setLineWidth, setOpacity, resetTools } = toolSlice.actions;

export default toolSlice.reducer;
