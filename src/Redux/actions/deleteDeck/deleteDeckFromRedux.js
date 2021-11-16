import { DELETE_DECK } from "./type";

export const deleteDeckFromRedux = (deck) => {
  return {
    type: DELETE_DECK,
    deck,
  };
};