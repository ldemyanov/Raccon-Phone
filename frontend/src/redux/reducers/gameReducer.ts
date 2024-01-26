import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGame, IWord } from '@src/hooks/useSocket';

export interface GameState {
  searchGuess: string;
  searchWrite: string;
  isReady: boolean;
  game: Omit<IGame, 'roomId'>;
}

const initialState: GameState = {
  searchGuess: '',
  searchWrite: '',
  isReady: false,
  game: {
    isGameStarted: false,
    gameStage: '',
    words: [],
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSearchGuess: (state, action: PayloadAction<string>) => {
      state.searchGuess = action.payload;
    },
    setSearchWrite: (state, action: PayloadAction<string>) => {
      state.searchWrite = action.payload;
    },
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
    setIsGameStarted: (state, action: PayloadAction<boolean>) => {
      state.game.isGameStarted = action.payload;
    },
    setGameStage: (state, action: PayloadAction<string>) => {
      state.game.gameStage = action.payload;
    },
    setWords: (state, action: PayloadAction<IWord[]>) => {
      state.game.words = action.payload;
    },
    setGameWord: (state, action: PayloadAction<IWord>) => {
      const index = state.game.words.findIndex((elem) => elem.writerId === action.payload.writerId);
      state.game.words[index] = action.payload;
    },
    setSoloResponse: (state, action: PayloadAction<{ index: number; response: string }>) => {
      state.game.words[action.payload.index].response = action.payload.response;
      console.log(state.game.words[action.payload.index]);
    },
    resetGame: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.searchGuess = '';
        state.searchWrite = '';
        state.isReady = false;
        state.game = {
          isGameStarted: false,
          gameStage: '',
          words: [],
        };
      }
    },
  },
});

export const {
  setSearchGuess,
  setSearchWrite,
  setIsReady,
  setIsGameStarted,
  setGameStage,
  setWords,
  setGameWord,
  setSoloResponse,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
