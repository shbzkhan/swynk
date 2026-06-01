import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  messages: any[]
}
const initialState: UserState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messsages',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string[]>) => {
      state.messages = action.payload;
    },

    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (msg) => msg._id !== action.payload
      );
    },

  },
});

export const { setMessage, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;
