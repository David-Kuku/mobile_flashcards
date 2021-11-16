import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { setCurrentDeckTitle } from "../Redux/actions/setCurrentDeckTitle/setCurrentDeckTitle";

const DeckCard = ({ navigation, title, size, dispatch }) => {
  const handlePress = () => {
    dispatch(setCurrentDeckTitle(title));
    navigation.navigate("Deck");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.size}>
          {size} {size > 1 ? "Cards" : "Card"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeckCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  size: {
    color: "black",
    opacity: 0.5,
    marginTop: 5,
  },
});