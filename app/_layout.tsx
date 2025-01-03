import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="quiz/[id]" options={{ title: "Quiz", headerShown: false }} />
        <Stack.Screen name="result" options={{ title: "Result", headerShown: false }} />
        <Stack.Screen name="leaderboard" options={{ title: "Leaderboard", headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}