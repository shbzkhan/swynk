import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  socket: any
}
const initialState: UserState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<string>) => {
      state.socket = action.payload;
    },

  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
