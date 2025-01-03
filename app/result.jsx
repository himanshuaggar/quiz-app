import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Title, Paragraph, Button } from "react-native-paper";

export default function ResultScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { score, correctAnswers, quizId, name } = route.params;

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Your Score: {score}</Title>
      <Title>Correct Answers:</Title>
      {correctAnswers && correctAnswers.length > 0 ? (
        correctAnswers.map((answer, index) => (
          <Paragraph key={index}>{answer}</Paragraph>
        ))
      ) : (
        <Paragraph>No correct answers available</Paragraph>
      )}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("leaderboard", { quizId })}
        style={styles.button}
      >
        Go to Leaderboard
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
});
