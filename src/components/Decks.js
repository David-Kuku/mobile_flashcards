import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { retrieveDecks } from "../Redux/actions/retrieveDecks/retrieveDecks";
import { connect } from "react-redux";
import DeckCard from "./DeckCard";

const Decks = ({ navigation, dispatch, decks }) => {
  const mounted = useRef(true);

  useEffect(() => {
    if (mounted.current) dispatch(retrieveDecks());
    return () => (mounted.current = false);
  }, []);

  return Object.keys(decks).length === 0 ? (
    <View style={styles.container_nodeck}>
      <Text style={styles.empty_deck}>Currently, no decks exist</Text>
    </View>
  ) : (
    <View style={styles.container_main}>
      <FlatList
        data={Object.keys(decks)}
        renderItem={({ item }) => (
          <DeckCard
            title={decks[item].title}
            size={decks[item].questions.length}
            navigation={navigation}
            dispatch={dispatch}
          />
        )}
        keyExtractor={(index) => "key" + index}
      />
    </View>
  );
};

const mapStateToProps = ({ decks }) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(Decks);

const styles = StyleSheet.create({
  container_main: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 75,
    minHeight: "100%",
    backgroundColor: "whitesmoke",
  },
  container_nodeck: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: "100%",
    backgroundColor: "whitesmoke",
  },
  empty_deck: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -52,
  },
});