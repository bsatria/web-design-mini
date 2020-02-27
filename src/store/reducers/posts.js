import { GET_POSTS } from "../actions/posts";

export const posts = (state = {}, action) => {
  const { type, payload } = action;
  console.log(type);
  switch (type) {
    case GET_POSTS:
      return payload;
    default:
      return state;
  }
};
