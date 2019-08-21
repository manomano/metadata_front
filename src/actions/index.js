import { FIELD_ADD_ELEMENT } from "../constants/action-types";


export function addArticle(payload) {
  return { type: FIELD_ADD_ELEMENT, payload }
}
