import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import JokeList from "../JokeList/JokeList";
import EmptyList from "../EmptyList/EmptyList";
import { JokeType } from "../../types/joke.types";

const getJokes = async (searchTerm: string) => {
  try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/Programming?contains=${searchTerm}&amount=10`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(">", error);
  }
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<{ error: boolean; jokes: JokeType[]; message: string }>();

  useEffect(() => {
    getJokes(searchTerm).then((receivedData) => setData(receivedData));
  }, [searchTerm]);

  if (!data) return <EmptyList />;
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={searchTerm} onChangeText={setSearchTerm} testID="searchInput" />
      <JokeList {...data} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
  },
});
