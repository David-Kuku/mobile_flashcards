import { retrieveDecksFromStorage } from "../../../utils/api";

export const retrieveDecks = () => {
  return (dispatch) => {
    retrieveDecksFromStorage(dispatch);
  };
};