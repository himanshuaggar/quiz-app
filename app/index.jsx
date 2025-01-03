import { Link } from 'expo-router';
import { View, Text, FlatList, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomeScreen() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/quizzes')
      .then(response => setQuizzes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <Text>Available Quizzes</Text>
      <FlatList
        data={quizzes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/quiz/${item.id}`}>
            <Button title={item.title} />
          </Link>
        )}
      />
    </View>
  );
}