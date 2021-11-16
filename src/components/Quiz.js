import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import CardFlip from "react-native-card-flip";
import { clearNotification, setNotification } from "../utils/api";
import Result from "./Result";

const Quiz = ({ navigation, decks, title }) => {
  const [next, setNext] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [percentage, setPercentage] = useState(false);
  const [flip, setFlip] = useState(false);
  const [numberOfQuestions] = useState(decks[title].questions.length);
  const isMounted = useRef(true);

  let flipcard;

  useEffect(() => {
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (isMounted.current)
      setPercentage(((score / numberOfQuestions) * 100).toFixed(2));
  }, [score]);

  useEffect(() => {
    if (isMounted.current) {
      if (showResult) clearNotification().then(() => setNotification());
    }
  }, [showResult]);

  const handleOption = (option) => {
    if (flip) {
      flipcard.flip();
      setFlip(false);
    }

    if (next + 1 === numberOfQuestions) {
      if (option === decks[title].questions[next].answer) setScore(score + 1);
      setShowResult(true);
    } else {
      if (option === decks[title].questions[next].answer) setScore(score + 1);
      setNext(next + 1);
    }
  };

  const handleQuit = () => {
    navigation.navigate("Deck");
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setNext(0);
    setShowResult(false);
    setPercentage(0);
  };

  const handleFlip = () => {
    flipcard.flip();
    setFlip(!flip);
  };

  return (
    <View>
      {showResult && (
        <Result
          percentage={percentage}
          score={score}
          numberOfQuestions={numberOfQuestions}
          restartQuiz={handleRestartQuiz}
          quit={handleQuit}
        />
      )}
      {!showResult &&
        (numberOfQuestions === 0 ? (
          <View style={styles.container}>
            <Text style={styles.noQuestions}>No Questions Available!</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.currentNumber}>
              {next + 1}/{numberOfQuestions}
            </Text>
            <View style={styles.cardWrapper}>
              <CardFlip
                style={styles.cardContainer}
                ref={(card) => (flipcard = card)}
                perspective={500}
              >
                <TouchableOpacity style={styles.face}>
                  <Text style={styles.questionTitle}>Question:</Text>
                  <Text style={styles.questionContent}>
                    {decks[title].questions[next].question}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.back}>
                  <Text style={styles.answerTitle}>Answer:</Text>
                  <Text style={styles.answerContent}>
                    {decks[title].questions[next].answer}
                  </Text>
                </TouchableOpacity>
              </CardFlip>
            </View>
            <View style={styles.showAnswerContainer}>
              <Text style={styles.showAnswerText} onPress={handleFlip}>
                Show Answer
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOption("True")}
            >
              <Text style={[styles.buttonText, { color: "#ff5e00" }]}>
                Correct
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#ff5e00" }]}
              onPress={() => handleOption("False")}
            >
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

const mapStateToProps = ({ decks, currentDeckTitle }) => {
  return {
    decks,
    title: currentDeckTitle,
  };
};

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: "100%",
    backgroundColor: "whitesmoke",
  },
  noQuestions: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: -50,
  },
  currentNumber: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: -100,
  },
  cardWrapper: {
    width: "100%",
  },
  cardContainer: {
    width: "100%",
    minHeight: 200,
    marginBottom: 20,
  },
  face: {
    flex: 1,
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 20,
    borderRadius: 10,
  },
  back: {
    borderRadius: 10,
    height: "100%",
    backgroundColor: "#ff5e00",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionTitle: {
    color: "#ff5e00",
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: -20,
  },
  questionContent: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  answerTitle: {
    color: "black",
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: -20,
  },
  answerContent: {
    color: "black",
    fontSize: 16,
  },
  showAnswerContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5,
    color: "white",
  },
  showAnswerText: {
    color: "white",
  },
  button: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    height: 60,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});