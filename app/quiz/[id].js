import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuizScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/quizzes/${id}`)
            .then(response => setQuiz(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const submitQuiz = () => {
        axios.post(`http://localhost:3000/quizzes/${id}/submit`, { answers })
            .then(response => {
                setScore(response.data.score);
                router.push({ pathname: '/result', params: { score: response.data.score, correctAnswers: response.data.correctAnswers } });
            })
            .catch(error => console.error(error));
    };

    if (!quiz) return <Text>Loading...</Text>;

    return (
        <View>
            <Text>{quiz.title}</Text>
            {quiz.questions.map((question, index) => (
                <View key={index}>
                    <Text>{question.text}</Text>
                    {question.options.map((option, i) => (
                        <Button
                            key={i}
                            title={option}
                            onPress={() => setAnswers({ ...answers, [index]: option })}
                        />
                    ))}
                </View>
            ))}
            <Button title="Submit" onPress={submitQuiz} />
        </View>
    );
}