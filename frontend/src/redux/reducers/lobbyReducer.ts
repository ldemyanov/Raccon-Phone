import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayer } from '@src/types';

export interface LobbyState {
  players: IPlayer[];
  roomID: string;
  self: IPlayer;
  isSolo: boolean;
}

const initialState: LobbyState = {
  players: [],
  isSolo: false,
  roomID: '',
  self: { icon: '', name: '', main: false, status: '', userId: '' },
};

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<IPlayer>) => {
      state.players = [...state.players, action.payload];
    },
    setPlayers: (state, action: PayloadAction<IPlayer[]>) => {
      state.players = action.payload;
    },
    setRoomID: (state, action: PayloadAction<string>) => {
      state.roomID = action.payload;
    },
    setSelfData: (state, action: PayloadAction<IPlayer>) => {
      state.self = action.payload;
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter((player) => player.userId !== action.payload);
    },
    setStatusPlayer: (state, action: PayloadAction<{ userId: string; status: string }>) => {
      const indexPlayer = state.players.findIndex((elem) => elem.userId === action.payload.userId);
      state.players[indexPlayer].status = action.payload.status;
      if (state.self.userId === action.payload.userId) state.self.status = action.payload.status;
    },
    setSoloGame: (state, action: PayloadAction<boolean>) => {
      state.isSolo = action.payload;
    },
  },
});

export const { setPlayer, setPlayers, setRoomID, setSelfData, removePlayer, setStatusPlayer, setSoloGame } = lobbySlice.actions;

export default lobbySlice.reducer;
