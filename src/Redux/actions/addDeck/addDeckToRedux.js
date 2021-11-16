import { ADD_DECK } from "./type";

export const addDeckToRedux = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
};