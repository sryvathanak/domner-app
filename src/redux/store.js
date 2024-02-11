import {configureStore} from '@reduxjs/toolkit';
import itemsReducer from './slice/userSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

export default store;
