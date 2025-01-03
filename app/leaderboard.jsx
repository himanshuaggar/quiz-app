import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { Title, Paragraph, Card } from "react-native-paper";

export default function LeaderboardScreen() {
  const route = useRoute();
  const { quizId } = route.params;
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios
      .get(`https://quiz-app-ao5k.onrender.com/leaderboard/${quizId}`)
      .then((response) => setLeaderboard(response.data))
      .catch((error) => console.error(error));
  }, [quizId]);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Leaderboard</Title>
      {leaderboard.map((item) => (
        <Card key={item._id} style={styles.card}>
          <Card.Content>
            <Paragraph>
              {item.name}: {item.score}
            </Paragraph>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
