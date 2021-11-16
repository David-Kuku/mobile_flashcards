import { ADD_CARD } from "./type";

export const addCardToRedux = (card, deck) => {
    console.log("in");
  return {
    type: ADD_CARD,
    card,
    deck,
  };
};