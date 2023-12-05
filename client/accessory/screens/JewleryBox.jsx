import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import JewelryDetails from "./JewleryDetails";

const JewelryBox = () => {

  const [jewelry, setJewelry] = useState([]);

  const fetchData = async () => {
    try {
      const data  = await axios.get(`http://192.168.1.121:3000/api/Jewelry`);
      setJewelry(data);
      console.log(data);
      
    } catch (error) {
      console.error(error);
  

    }

    useEffect(() => {
      fetchData();
    }, []);
  };

  const handleButtonPress = (jewelry) => {
    navigation.navigate("details", { jewelry });
  };
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {jewelry.map((jew) => (
        <View style={styles.container}>
          <JewelryDetails
            jewelry={jew}
            onPress={(jewelry) => handleButtonPress(jewelry)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap", // Allow items to wrap to the next line
    padding: 10,
  },
  box: {
    width: "45%", // Adjust as needed to leave some space between the boxes
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 10, // Add some space between boxes
  },
  image: {
    width: "100%",
    height: 150, // Adjust the height as needed
    borderRadius: 8,
    marginBottom: 10,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    textAlign: "center",
  },

  scrollView: {
    flexGrow: 1,
    paddingBottom: 100, // Height of your Footer
  },
});

export default JewelryBox;
