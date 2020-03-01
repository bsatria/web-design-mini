import { getData, postData } from "../helpers/fetch";

export function getItems() {
  return getData(`http://34.87.100.80:8080/barangs/search`).then(data => data);
}

export function addItem(data) {
  return postData(`http://34.87.100.80:8080/barangs`, data);
}
