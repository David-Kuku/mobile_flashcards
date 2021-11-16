import { RETRIEVE_DECKS } from "../actions/retrieveDecks/type";
import { ADD_DECK } from "../actions/addDeck/type";
import { DELETE_DECK } from "../actions/deleteDeck/type";
import { ADD_CARD } from "../actions/addCard/type";

export const decks = (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_DECKS: {
      return {
        ...state,
        ...action.decks,
      };
    }
    case ADD_DECK: {
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: [],
        },
      };
    }
    case ADD_CARD: {
      let decks = state;
      decks[action.deck].questions.push(action.card);
      return { ...decks };
    }
    case DELETE_DECK: {
      let decks = state;
      delete decks[action.deck];
      return { ...decks };
    }
    default: {
      return state;
    }
  }
};