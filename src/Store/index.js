import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../Reducers/login';

const main = combineReducers({
  loginuser: loginSlice,
})

export default configureStore({ 
  reducer:{
      main:main
  },
})

