import { postData } from "../helpers/fetch";

export function addSurvey(data) {
  return postData(`http://34.87.100.80:8080/surveys`, data);
}
