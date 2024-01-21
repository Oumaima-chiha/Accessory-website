
import React,{useState,useEffect} from "react";
import { View, TextInput, ScrollView, Text, StyleSheet,Image,TouchableOpacity } from "react-native";
import JewelryBox from "./JewleryBox";
import { Images } from "../contants";
import { userApi } from "../services/modules/users";
import { api } from "../services/api";
import { navigation,useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
const navigation = useNavigation();
const handleShopByCategoryPress = () => {
  navigation.navigate('CollectionsNav'); 
};

  return (

    <View style={styles.container}>
   
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBar} placeholder="Search..." value={searchTerm}  onChangeText={(text) => setSearchTerm(text)} />
      </View>
       <Image
        source={Images.BLING}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
    <TouchableOpacity onPress={handleShopByCategoryPress} style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Shop By Category</Text>
        <MaterialCommunityIcons name="arrow-right" size={20} color="#333" />
      </View>
    </TouchableOpacity>
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
      <View style={styles.separator} />
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
  container: {
    padding: 8,

    
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

   
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'lightgray', 
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // Adjust padding as needed
    // Other styles for the top bar

  },
  separator: {
    width: '100%',
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 20,
  backgroundColor:"rgb(106, 90, 205)",
  
  
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
 

});

export default HomePage;
