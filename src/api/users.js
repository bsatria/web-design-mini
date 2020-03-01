import { getData } from "../helpers/fetch";

export function getUsers() {
  return getData(`https://jsonplaceholder.typicode.com/posts`).then(
    data => data
  );
}
