import { deleteDeckFromStorage } from "../../../utils/api";

export function deleteDeck(deck) {
  return (dispatch) => {
    deleteDeckFromStorage(dispatch, deck);
  };
}