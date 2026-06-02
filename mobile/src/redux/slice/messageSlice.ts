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
    addMessage: (state, action: PayloadAction<any>) => {
      state.messages.unshift(action.payload);
    },
    deletedMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (msg) => msg._id !== action.payload
      );
    },

  },
});

export const { setMessage, addMessage, deletedMessage } = messageSlice.actions;
export default messageSlice.reducer;
