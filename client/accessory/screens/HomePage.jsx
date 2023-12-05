
import React from "react";
import { View, TextInput, ScrollView, Text, StyleSheet,Image } from "react-native";
import JewelryBox from "./JewleryBox";
import { Images } from "../contants";



const HomePage = () => {
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBar} placeholder="Search..." />
      </View>
       <Image
        source={Images.ACCESSORY}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
     
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        <View style={styles.category}><Text>All</Text></View>
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
  logo: {
    position: 'absolute',
    top: 0, // Adjust this value as needed to create space from the top
    left: 0,
    right: 0,
    height: 200,
    width: '100%',
    zIndex: 111111, // Set a value greater than the search bar's zIndex
  },
  
  searchBar: {
    height: 40,
    margin: 10,
    marginTop: 210, // Adjust this value to create space below the logo and above the search bar
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  
  category: {
    paddingHorizontal: 10,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 14,
    marginTop: 10, // Adjust this value to add space between the search bar and categories
  },
  
});

export default HomePage;
