// HomePage.js

import React from "react";
import { View, TextInput, ScrollView, Text, StyleSheet } from "react-native";
import JewelryBox from "./JewleryBox";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search..." />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        <Text style={styles.category}>All</Text>
        <Text style={styles.category}>Rings</Text>
        <Text style={styles.category}>Necklaces</Text>
        <Text style={styles.category}>Earings</Text>
        <Text style={styles.category}>Braclets</Text>
        <Text style={styles.category}>Hair clips</Text>
        <Text style={styles.category}>Brooches</Text>
      </ScrollView>
      <JewelryBox/>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30,
    paddingHorizontal: 20,
  },

  category: {
    paddingHorizontal: 10,
    margin: 10,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 20,
  },
});

export default HomePage;
