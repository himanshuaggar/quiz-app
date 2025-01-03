import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/quizzes/leaderboard")
      .then((response) => setLeaderboard(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <Text>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.name}: {item.score}
          </Text>
        )}
      />
    </View>
  );
}
