import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from './Reducers/login';
import { userSlice } from './Reducers/user';

import { combineReducers } from 'redux';

const main = combineReducers({
  login: loginSlice.reducer,
  user: userSlice.reducer,
})

export default configureStore({
  reducer: {
    main: main
  },
})