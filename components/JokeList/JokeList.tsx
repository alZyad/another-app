import data from "../../mockData.json";
import Error from "../Error/Error";
import JokePreview from "../JokePreview/JokePreview";
import { StyleSheet, ScrollView } from "react-native";

export type JokeType = {
  category: string; // "Programming" | "Misc" | "Dark" | "Pun" | "Spooky" | "Christmas";
  type: string; // "single" | "twopart";
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string; // "en";
};

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
