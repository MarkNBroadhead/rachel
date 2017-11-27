import { combineReducers } from 'redux';
import app from './app';
import user from './user';

const App = combineReducers({
  app,
  user,
})

export default App
