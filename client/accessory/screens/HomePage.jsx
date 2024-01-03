
import React,{useState,useEffect} from "react";
import { View, TextInput, ScrollView, Text, StyleSheet,Image,TouchableOpacity } from "react-native";
import JewelryBox from "./JewleryBox";
import { Images } from "../contants";
import { userApi } from "../services/modules/users";
import { api } from "../services/api";

const category = [
  "All",
  "Rings",
  "Necklaces",
  "Earings",
  "Braclets",
  "HairClips",
  "Brooches",
  
];

const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState("");
const[selectedCategory,setSelectedCategory]=useState('')



  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBar} placeholder="Search..." value={searchTerm}  onChangeText={(text) => setSearchTerm(text)} />
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
         {category.map((categoryName,index) => (
        <TouchableOpacity
         key={categoryName+index}
          onPress={() => setSelectedCategory(categoryName)}
        >
        <View style={styles.category}><Text>{categoryName}</Text></View>
       
        </TouchableOpacity>
         ))}
      </ScrollView>
      <JewelryBox searchTerm={searchTerm} selectedCategory={selectedCategory} />

    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    width: '100%',
    zIndex: 111111,
  },
  container:{
    flex:1,
  },

  searchBar: {
    height: 40,
    margin: 10,
    marginTop: 210,
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
    marginTop: 10,
  },

});

export default HomePage;
