import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/modules/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const reducerName='user'
const userSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload; // Update logged-in status based on user data
      state.isLoading = false;
      state.error = null;
    },
      logout: ()=>{
          // Clear accessToken from AsyncStorage on logout
          AsyncStorage.removeItem('accessToken');
          console.log('removed token')
          return initialState;
      }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        userApi.endpoints.customerSignin.matchFulfilled,
        (state, { payload }) => {
          AsyncStorage.setItem('accessToken',payload.token)
          state.user = payload; // Set user data
          state.isLoggedIn = true; // Update logged-in status
          state.isLoading = false;
          state.error = null;
        }
      )
        }
      })

export const { setUser,logout } = userSlice.actions;
export default { [reducerName]: userSlice.reducer };
