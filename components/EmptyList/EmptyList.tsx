import { Text, View, StyleSheet } from "react-native";

export default function Error() {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.text}>No jokes here, look away</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
