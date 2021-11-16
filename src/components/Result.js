import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Result = ({
  score,
  restartQuiz,
  quit,
  percentage,
  numberOfQuestions,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.resultTitle}>Result Statistics</Text>
      {score < numberOfQuestions / 2 ? (
        <Text style={styles.performance}>You Performed Poorly!</Text>
      ) : score === numberOfQuestions ? (
        <Text style={styles.performance}>
          Excellent! You got it all correctly.
        </Text>
      ) : (
        <Text style={styles.performance}>You perfromed well!</Text>
      )}
      <Text style={styles.score}>
        You got {score}/{numberOfQuestions} questions correctly, having an
        accuracy of {percentage}%
      </Text>
      <TouchableOpacity style={styles.button} onPress={restartQuiz}>
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "black" }]}
        onPress={quit}
      >
        <Text style={[styles.buttonText, { color: "#ff5e00" }]}>
          Back to Deck
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: "100%",
  },
  resultTitle: {
    marginBottom: 20,
    fontSize: 23,
    fontWeight: "bold",
    marginTop: -100,
  },
  performance: {
    marginBottom: 10,
    fontSize: 18,
    opacity: 0.7,
  },
  score: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: "center",
    opacity: 0.7,
  },
  button: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ff5e00",
    borderRadius: 5,
    height: 60,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});