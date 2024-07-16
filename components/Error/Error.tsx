import { Text, View, StyleSheet } from "react-native";

export default function Error() {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.text}>Component failed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 10,
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
