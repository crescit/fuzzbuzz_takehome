import { configureStore } from '@reduxjs/toolkit';
import repo from './git/index';

export default configureStore({
  reducer: {
    repo: repo,
  },
});
