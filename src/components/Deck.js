import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { deleteDeck } from "../Redux/actions/deleteDeck/deleteDeck";

const Deck = ({ navigation, decks, title, dispatch }) => {
  const [numberOfCards, setNumberOfCards] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  //wait for redux to be updated to prevent error
  useEffect(() => {
    if (isMounted.current) {
      if (Object.keys(decks).includes(title)) {
        setNumberOfCards(decks[title].questions.length);
      }
    }
  }, [decks]);

  useEffect(() => {
    if (isMounted.current) {
      navigation.setOptions({ title: title });
    }
  }, []);

  const handleDeleteDeck = () => {
    dispatch(deleteDeck(title));
    navigation.navigate("Decks");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.size}>
        {numberOfCards} {numberOfCards > 1 ? "Cards" : "Card"}
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => navigation.navigate("AddCard")}
      >
        <Text style={[styles.buttonText, { color: "#ff5e00" }]}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.quizButton]}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.buttonText}>Start a Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteDeck}
      >
        <Text style={[styles.buttonText, { color: "#ff5e00" }]}>
          Delete Deck
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ decks, currentDeckTitle }) => {
  return {
    decks,
    title: currentDeckTitle,
  };
};

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "whitesmoke",
  },
  title: {
    fontSize: 23,
    width: "80%",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -100,
  },
  size: {
    marginBottom: 30,
    opacity: 0.5,
  },
  button: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#007ACC",
    borderRadius: 5,
    height: 60,
    marginTop: 5,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: "#fff",
  },
  quizButton: {
    backgroundColor: "#ff5e00",
  },
  deleteButton: {
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});