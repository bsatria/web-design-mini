import { createStore, combineReducers } from 'redux';
import { name } from './reducers/name';
import { posts } from './reducers/posts';

const reducers = combineReducers({
  name,
  posts,
});

export const store = createStore(
  reducers,
  window.devToolsExtension && window.devToolsExtension(),
);
