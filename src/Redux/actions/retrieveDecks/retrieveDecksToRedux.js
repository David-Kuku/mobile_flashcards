import { RETRIEVE_DECKS } from "./type";

export const retrieveDecksToRedux = (decks) => {
  return {
    type: RETRIEVE_DECKS,
    decks,
  };
};