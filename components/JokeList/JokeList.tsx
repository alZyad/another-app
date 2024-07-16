import { useState } from "react";
import data from "../../mockData.json";
import { JokeType } from "../../types/joke.types";
import Error from "../Error/Error";
import JokePreview from "../JokePreview/JokePreview";
import { StyleSheet, ScrollView, View, TextInput } from "react-native";

export default function JokeList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { error, jokes }: { error: boolean; jokes: JokeType[] } = data;
  if (error) return <Error />;
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
