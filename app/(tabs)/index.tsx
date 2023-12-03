import { Button, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useState } from "react";
import dayjs from "dayjs";

export default function TabOneScreen() {
  const [landingTime, setLandingTime] = useState("");

  const [remainingTime, setRemainingTime] = useState("");

  const handleCalculate = () => {
    const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const enteredTime = dayjs(landingTime);

    console.log("currentTime: ", currentTime);
    console.log("enteredTime: ", enteredTime.isValid());
    console.log("enteredTime: ", enteredTime.format("YYYY-MM-DD HH:mm:ss"));
    if (enteredTime.isValid()) {
      const timeDifference = enteredTime.diff(currentTime, "minute");
      console.log("timeDifference: ", timeDifference);
      if (timeDifference > 0) {
        const hours = Math.floor(timeDifference / 60);
        const minutes = timeDifference % 60;
        setRemainingTime(
          `Time remaining for Flight: ${hours} hours ${minutes} minutes`
        );
      } else {
        setRemainingTime("Invalid time or the flight has already landed.");
      }
    } else {
      console.log("Please enter a valid time.");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          margin: 10,
        }}
      >
        Enter date and time YYYY-MM-DD HH:mm
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date and time YYYY-MM-DD HH:mm"
        value={landingTime}
        onChangeText={(text) => setLandingTime(text)}
      />
      <Button
        title="Calculate"
        onPress={handleCalculate}
        // style={styles.button}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.remainingTimeText}>{remainingTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: "#4b5563",
    padding: 10,
    borderRadius: 8,
  },
  remainingTimeText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    // color: "white",
  },
});
