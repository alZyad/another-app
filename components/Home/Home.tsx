import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import JokeList from "../JokeList/JokeList";
import EmptyList from "../EmptyList/EmptyList";
import { DataType, JokeType } from "../../types/joke.types";

const getJokes = async (searchTerm?: string) => {
  try {
    const response1 = await fetch(`https://v2.jokeapi.dev/joke/Programming?contains=${searchTerm}&amount=10`);
    const response2 = await fetch(`https://v2.jokeapi.dev/joke/Programming?contains=${searchTerm}&amount=10`);
    const json1: DataType = await response1.json();
    const json2: DataType = await response2.json();

    return [json1, json2];
  } catch (error) {
    console.error(error);
  }
};

const mergeReceivedData = (data1?: DataType, data2?: DataType) => {
  if (!data1 || !data2) return { error: true, amount: 0, jokes: [] };
  if (!data1.jokes) return data2;
  if (!data2.jokes) return data1;

  let mergedData = data1;
  const jokes1: JokeType[] = data1.jokes;
  const jokes2: JokeType[] = data2.jokes;
  const mergedJokes = jokes1.reduce<JokeType[]>((acc, joke) => {
    if (acc.every((existingJoke) => existingJoke.id !== joke.id)) return [...acc, joke];
    return acc;
  }, jokes2);
  mergedData.jokes = mergedJokes;
  return mergedData;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadJokes, setLoadJokes] = useState(0);
  const [data, setData] = useState<DataType>();
  const [bookmarkedJokes, setBookmarkedJokes] = useState<number[]>([]);

  useEffect(() => {
    getJokes(searchTerm).then((receivedData) => {
      if (!receivedData) return;
      setData(mergeReceivedData(receivedData[0], receivedData[1]));
    });
  }, [searchTerm]);

  useEffect(() => {
    if (!loadJokes) return;
    getJokes(searchTerm).then((receivedData) => {
      if (!receivedData) return;
      const mergedRequests = mergeReceivedData(receivedData[0], receivedData[1]);
      setData((prevValue) => mergeReceivedData(mergedRequests, prevValue));
    });
  }, [loadJokes, searchTerm]);

  if (!data) return <EmptyList />;
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={searchTerm} onChangeText={setSearchTerm} testID="searchInput" />
      <JokeList {...data} setLoadJokes={setLoadJokes} bookmarkState={[bookmarkedJokes, setBookmarkedJokes]} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    width: 300,
    margin: 10,
    padding: 10,
  },
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
  },
});
