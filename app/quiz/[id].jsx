import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Card,
  Button,
  Title,
  Paragraph,
  TouchableRipple,
} from "react-native-paper";

export default function QuizScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, name } = route.params;
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios
      .get(`https://quiz-app-ao5k.onrender.com/quizzes/${id}`)
      .then((response) => setQuiz(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const submitQuiz = () => {
    axios
      .post(`https://quiz-app-ao5k.onrender.com/quizzes/${id}/submit`, {
        answers,
        name,
      })
      .then((response) => {
        setScore(response.data.score);
        navigation.navigate("result", {
          score: response.data.score,
          correctAnswers: response.data.correctAnswers,
          quizId: id,
          name,
        });
      })
      .catch((error) => console.error(error));
  };

  if (!quiz) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>{quiz.title}</Title>
      {quiz.questions.map((question, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Title>{question.text}</Title>
            {question.options.map((option, i) => (
              <TouchableRipple
                key={i}
                style={[
                  styles.option,
                  answers[index] === option && styles.selectedOption,
                ]}
                onPress={() => setAnswers({ ...answers, [index]: option })}
                rippleColor="rgba(0, 0, 0, .32)"
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableRipple>
            ))}
          </Card.Content>
        </Card>
      ))}
      <Button mode="contained" onPress={submitQuiz} style={styles.submitButton}>
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
  },
  option: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: "#c0e8e0",
  },
  optionText: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
  },
});
