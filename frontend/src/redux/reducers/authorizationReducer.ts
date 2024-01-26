import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { icons } from '@src/utils/icon';

export interface AuthorizationState {
  name: string;
  icon: string;
}

const initialState: AuthorizationState = {
  name: '',
  icon: icons[Math.floor(Math.random() * icons.length)],
};

export const authorizationSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setImg: (state, action: PayloadAction<number>) => {
      state.icon = icons[action.payload];
    },
  },
});

export const { setImg, setName } = authorizationSlice.actions;

export default authorizationSlice.reducer;
