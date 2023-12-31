import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/modules/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  // ... other user-related state properties
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload; // Update logged-in status based on user data
      state.isLoading = false;
      state.error = null;
    },
    // Add more reducers for user-related actions (login, logout, update profile, etc.)
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
      .addMatcher(
        userApi.endpoints.customerSignin.matchRejected,
        (state, { payload }) => {
          // Handle failed user sign-in
          state.user = null; // Clear user data
          state.isLoggedIn = false; // Update logged-in status
          state.isLoading = false;
          state.error = payload; // Set error message
        }
      )
      // Add matchers for other user-related endpoints (profile update, logout, etc.)
      // You can use matchFulfilled, matchRejected, and matchPending for different API endpoint states
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
