import { combineReducers } from "redux";
import { decks } from "./decks";
import { currentDeckTitle } from "./currentDeckTitle";

export default combineReducers({
  decks,
  currentDeckTitle,
});