import { Pressable, StyleSheet, Text, View } from "react-native";
import { JokeType } from "../../types/joke.types";
import { Dispatch, SetStateAction } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { memo } from "react";

const toggleBookmark = (bookmarks: number[], jokeId: number) => {
  if (bookmarks.includes(jokeId)) {
    bookmarks = bookmarks.filter((jokeId_) => jokeId !== jokeId_);
  } else {
    bookmarks = [...bookmarks, jokeId];
  }
  return bookmarks;
};

export const JokePreview = memo(function JokePreview({
  jokeData,
  isBookmared,
  setBookmarkedJokes,
}: {
  jokeData: JokeType;
  isBookmared: boolean;
  setBookmarkedJokes: Dispatch<SetStateAction<number[]>>;
}) {
  const preview = (jokeData.joke || jokeData.setup)
    ?.replace(/[\s]/gi, " ")
    .replace(/[^0-9a-z ']/gi, "")
    .split(" ")
    .slice(0, 4)
    .join(" ");
  return (
    <View style={styles.container} testID="jokePreview">
      <Text style={styles.text}>{preview}...</Text>
      <Pressable
        style={styles.bookmark}
        onPressIn={() =>
          setBookmarkedJokes((prevValue) => {
            return toggleBookmark(prevValue, jokeData.id);
          })
        }
      >
        <AntDesign name={isBookmared ? "star" : "staro"} size={18} color={isBookmared ? "#dbde14" : "black"} />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    width: 170,
    height: 50,
  },
  text: {
    width: 140,
  },
  bookmark: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
