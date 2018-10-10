import { UPDATE_NAME } from '../actions/name';

export const name = (state = 'Bagas Satria Nugroho', action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:
      return payload;
    default:
      return state;
  }
};
