import { addDeckToStorage } from "../../../utils/api";

export function addDeck(deck) {
  return (dispatch) => {
    addDeckToStorage(dispatch, deck);
  };
}