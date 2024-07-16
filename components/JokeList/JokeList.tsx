import data from "../../mockData.json";
import { JokeType } from "../../types/joke.types";
import Error from "../Error/Error";
import JokePreview from "../JokePreview/JokePreview";
import { StyleSheet, ScrollView } from "react-native";

export default function JokeList() {
  const { error, jokes }: { error: boolean; jokes: JokeType[] } = data;
  if (error) return <Error />;
  return (
    <ScrollView contentContainerStyle={styles.listContent} style={styles.scrollList}>
      {jokes.map((jokeData) => (
        <JokePreview {...jokeData} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25,
  },
  scrollList: {
    paddingTop: 30,
    width: "100%",
  },
});
