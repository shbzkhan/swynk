import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/user.types';

interface UserState {
  user: UserData | null;
  onlineUsers:string[] | null
}
const initialState: UserState = {
  user: null,
  onlineUsers: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },

    clearUser: state => {
      state.user = null;
    },

    setOnlineUsers :(state, action: PayloadAction<string[]>) =>{
      state.onlineUsers = action.payload;
    },
  },
});

export const { userData, clearUser, setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;
