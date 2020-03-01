import { getData } from "../helpers/fetch";

export function getItems() {
  return getData(`http://34.87.100.80:8080/barangs/search`).then(data => data);
}
