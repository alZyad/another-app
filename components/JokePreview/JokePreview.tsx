import { StyleSheet, Text, View } from "react-native";
import { JokeType } from "../../types/joke.types";

export default function JokePreview(jokeData: JokeType) {
  const preview = (jokeData.joke || jokeData.setup)
    ?.replace(/[\s]/gi, " ")
    .replace(/[^0-9a-z ']/gi, "")
    .split(" ")
    .slice(0, 4)
    .join(" ");
  return (
    <View style={styles.container} testID="jokePreview">
      <Text>{preview}...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    width: 150,
    height: 50,
  },
});
