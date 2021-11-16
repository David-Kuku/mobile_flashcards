import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { addCard } from "../Redux/actions/addCard/addCard";

const AddCard = ({ navigation, dispatch, deck }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (value) => {
    setQuestion(value);
  };

  const handleAnswerChange = (value) => {
    setAnswer(value);
  };

  const isAnswerValid = (answer) => {
    return answer === "True" || answer === "False";
  };

  const handleSubmit = () => {
    let formatted_answer = answer[0].toUpperCase() + answer.slice(1);
    dispatch(
      addCard(
        {
          question: question,
          answer: formatted_answer,
        },
        deck
      )
    );
    if (isAnswerValid(formatted_answer) === true) {
      navigation.navigate("Deck");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Question</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          handleQuestionChange(value);
        }}
        value={question}
        placeholder="Question"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          handleAnswerChange(value);
        }}
        value={answer}
        placeholder="Answer: Enter True or False"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ currentDeckTitle }) => {
  return {
    deck: currentDeckTitle,
  };
};

export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
  },
  title: {
    fontSize: 23,
    width: "70%",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    marginTop: -102,
  },
  input: {
    height: 58,
    width: "100%",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ff5e00",
    borderRadius: 5,
    height: 60,
    marginTop: 30,
    marginBottom: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});