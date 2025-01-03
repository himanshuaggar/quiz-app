import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  Card,
  Title,
  Paragraph,
  TouchableRipple,
  Button,
} from "react-native-paper";

export default function HomeScreen() {
  const [quizzes, setQuizzes] = useState([]);
  const [name, setName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("https://quiz-app-ao5k.onrender.com/quizzes")
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error(error));
  }, []);

  const startQuiz = (id) => {
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }
    navigation.navigate("quiz/[id]", { id, name });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Available Quizzes</Title>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableRipple
            onPress={() => startQuiz(item._id)}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Card style={styles.card}>
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableRipple>
        )}
      />
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 20,
  },
});
