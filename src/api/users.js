export function getUsers() {
  return fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(resp => resp.json())
    .then(data => data);
}
