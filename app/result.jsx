import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";
import React from "react";

export default function ResultScreen() {
  const { score, correctAnswers } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text>Your Score: {score}</Text>
      <Text>Correct Answers:</Text>
      {correctAnswers.map((answer, index) => (
        <Text key={index}>{answer}</Text>
      ))}
      <Button
        title="Go to Leaderboard"
        onPress={() => router.push("/leaderboard")}
      />
    </View>
  );
}
