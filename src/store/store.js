import { createStore, combineReducers } from "redux";
import { name } from "./reducers/name";
import { posts } from "./reducers/posts";

const reducers = combineReducers({
  name,
  posts
});

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
