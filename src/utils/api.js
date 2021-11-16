import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveDecksToRedux } from "../Redux/actions/retrieveDecks/retrieveDecksToRedux";
import { addDeckToRedux } from "../Redux/actions/addDeck/addDeckToRedux";
import { deleteDeckFromRedux } from "../Redux/actions/deleteDeck/deleteDeckFromRedux";
import { addCardToRedux } from "../Redux/actions/addCard/addCardToRedux";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

export const STORAGE_KEY = "Flashcards";
let NOTIFICATION_KEY = "Flashcards:notifications";

export const addDeckToStorage = async (dispatch, deck) => {
  try {
    let allDecks;
    let decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    decks = decks !== null ? decks : {};
    if (Object.keys(decks).includes(deck) === false) {
      dispatch(addDeckToRedux(deck));
      allDecks = {
        ...decks,
        [deck]: {
          title: deck,
          questions: [],
        },
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allDecks));
    } else {
      alert("This deck title already exists, choose a different name.");
    }
  } catch (error) {
    alert("Failed to save deck to storage.");
  }
};

export const retrieveDecksFromStorage = async (dispatch) => {
  try {
    let res = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    res = res !== null ? res : {};
    dispatch(retrieveDecksToRedux(res));
  } catch (error) {
    alert("Failed to retrieve decks from storage");
  }
};

export const deleteDeckFromStorage = async (dispatch, deck) => {
  try {
    let decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    delete decks[deck];
    dispatch(deleteDeckFromRedux(deck));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  } catch (error) {
    alert("Failed to delete deck from storage");
  }
};

export const addCardToStorage = async (dispatch, card, deck) => {
  try {
    if (card.answer === "True" || card.answer === "False") {
      let decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      decks[deck].questions.push(card);
      dispatch(addCardToRedux(card, deck));
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } else {
      alert("Your answer must be either True or false");
    }
  } catch (error) {
    alert("Failed to add card to deck");
  }
};

// enable notification display when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    try {
      return {
        shouldShowAlert: true,
      };
    } catch (error) {
      return null;
    }
  },
});

export const clearNotification = async () => {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    return null;
  }
};

export const createNotification = () => {
  return {
    title: "Mobile Flashcards",
    body: "Hey 👋 Don't forget to attempt at least one quiz today.",
    ios: {
      sound: true,
    },
    andriod: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
};

export const setNotification = async () => {
  try {
    let access = await JSON.parse(await AsyncStorage.getItem(NOTIFICATION_KEY));
    if (access === null) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Notifications.cancelAllScheduledNotificationsAsync();
        Notifications.scheduleNotificationAsync({
          content: createNotification(),
          trigger: {
            hour: 24,
          },
        });
        await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      }
    }
  } catch (error) {
    return null;
  }
};