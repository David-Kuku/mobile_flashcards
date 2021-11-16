import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../Redux/actions/addDeck/addDeck";
import { setCurrentDeckTitle } from "../Redux/actions/setCurrentDeckTitle/setCurrentDeckTitle";

const AddDeck = ({ navigation, dispatch, decks }) => {
  const [deck, setDeck] = useState("");

  const handleDeckChange = (deck) => {
    setDeck(deck);
  };

  const doesDeckExist = (deck) => {
    let allDecks;
    allDecks = decks !== null ? decks : {};
    return Object.keys(allDecks).includes(deck);
  };

  const handleCreateDeck = () => {
    dispatch(addDeck(deck));
    dispatch(setCurrentDeckTitle(deck));
    setDeck("");
    if (doesDeckExist(deck) !== true) {
      navigation.navigate("Deck", { numberOfCards: 0 });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.mainContainer}>
        <View style={styles.actionContainer}>
          <Text style={styles.textHeader}>
            What is the title of your new deck?
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              handleDeckChange(value);
            }}
            value={deck}
            placeholder="Enter the deck title"
            placeholderTextColor="black"
            maxLength={25}
          />
          <TouchableOpacity
            disabled={!deck}
            style={[styles.button, styles.resetButton]}
            onPress={() => setDeck("")}
          >
            <Text style={[styles.buttonText, { color: "#193236" }]}>
              Reset Input
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!deck}
            style={styles.button}
            onPress={handleCreateDeck}
          >
            <Text style={styles.buttonText}>Create Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({ decks }) => {
  return { decks };
};

export default connect(mapStateToProps)(AddDeck);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "whitesmoke",
  },
  textHeader: {
    fontSize: 23,
    width: "70%",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    color: "black",
  },
  actionContainer: {
    width: "100%",
  },
  input: {
    height: 60,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    marginTop: 30,
    marginBottom: 50,
    padding: 10,
    borderRadius: 5,
    margin: "auto",
    fontSize: 16,
    color: "black",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#193236",
    borderRadius: 5,
    height: 60,
    marginTop: 5,
    marginBottom: 5,
  },
  resetButton: {
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});