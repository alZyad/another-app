import { JokeType } from "../../types/joke.types";
import Error from "../Error/Error";
import { StyleSheet, ScrollView, View, NativeScrollEvent } from "react-native";
import EmptyList from "../EmptyList/EmptyList";
import { Dispatch, SetStateAction, useState } from "react";
import { JokePreview } from "../JokePreview/JokePreview";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export default function JokeList({
  error,
  jokes,
  message,
  setLoadJokes,
  bookmarkState,
}: {
  error: boolean;
  jokes: JokeType[];
  message?: string;
  setLoadJokes: Dispatch<SetStateAction<number>>;
  bookmarkState: [number[], Dispatch<SetStateAction<number[]>>];
}) {
  const [bookmarkedJokes, setBookmarkedJokes] = bookmarkState;

  const [atBottom, setAtBottom] = useState(false);

  if (error && message === "No matching joke found") {
    return <EmptyList />;
  }
  if (error && message !== "No matching joke found") return <Error />;
  return (
    <ScrollView
      contentContainerStyle={styles.listContent}
      style={styles.scrollList}
      onScroll={({ nativeEvent }) => {
        if (!atBottom && isCloseToBottom(nativeEvent)) {
          setLoadJokes((prevValue) => prevValue + 1);
        }
        setAtBottom(isCloseToBottom(nativeEvent));
      }}
    >
      {jokes.map((jokeData) => (
        <JokePreview
          jokeData={jokeData}
          key={jokeData.id}
          isBookmared={bookmarkedJokes.includes(jokeData.id)}
          setBookmarkedJokes={setBookmarkedJokes}
        />
      ))}
      {jokes.length % 2 === 1 && <View style={styles.emptyPreview} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    paddingTop: 20,
    paddingBottom: 50,
  },
  scrollList: {
    width: "100%",
  },
  emptyPreview: {
    padding: 5,
    width: 150,
    height: 50,
  },
});
