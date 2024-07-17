import { JokeType } from "../../types/joke.types";
import Error from "../Error/Error";
import JokePreview from "../JokePreview/JokePreview";
import { StyleSheet, ScrollView } from "react-native";
import EmptyList from "../EmptyList/EmptyList";

export default function JokeList({ error, jokes, message }: { error: boolean; jokes: JokeType[]; message: string }) {
  if (error && message === "No matching joke found") {
    return <EmptyList />;
  }
  if (error && message !== "No matching joke found") return <Error />;
  return (
    <ScrollView contentContainerStyle={styles.listContent} style={styles.scrollList}>
      {jokes.map((jokeData) => (
        <JokePreview {...jokeData} key={jokeData.id} />
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
    width: "100%",
  },
});
