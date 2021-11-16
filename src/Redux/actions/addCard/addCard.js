import { addCardToStorage } from "../../../utils/api";

export function addCard(card, deck) {
  return (dispatch) => {
    addCardToStorage(dispatch, card, deck);
  };
}