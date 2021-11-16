import {SET_CURRENT_DECK_TITLE} from "./type";

export const setCurrentDeckTitle = (title) => {
  return {
    type: SET_CURRENT_DECK_TITLE,
    title,
  };
};