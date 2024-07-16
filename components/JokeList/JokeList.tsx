import { useEffect, useState } from "react";
import { JokeType } from "../../types/joke.types";
import Error from "../Error/Error";
import JokePreview from "../JokePreview/JokePreview";
import { StyleSheet, ScrollView, View, TextInput } from "react-native";
import EmptyList from "../EmptyList/EmptyList";

const getJokes = async (searchTerm: string) => {
  try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/Programming?contains=${searchTerm}&amount=10`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default function JokeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    getJokes(searchTerm).then((receivedData) => setData(receivedData));
  }, [searchTerm]);

  if (!data) return <EmptyList />;
  const { error, jokes, message } = data as { error: boolean; jokes: JokeType[]; message: string };
  if (error && message === "No matching joke found") {
    return <EmptyList />;
  }
  if (error && message !== "No matching joke found") return <Error />;
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={searchTerm} onChangeText={setSearchTerm} testID="searchInput" />
      <ScrollView contentContainerStyle={styles.listContent} style={styles.scrollList}>
        {jokes
          .filter((jokeData) =>
            ((jokeData?.joke || "") + (jokeData?.delivery || "") + (jokeData?.setup || ""))?.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((jokeData) => (
            <JokePreview {...jokeData} key={jokeData.id} />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  listContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25,
  },
  scrollList: {
    width: "100%",
  },
  container: {
    paddingTop: 30,
  },
});
