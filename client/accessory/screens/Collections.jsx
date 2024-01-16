import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: '0', name: 'Best Sellers', image: require("../assets/pink.jpg") },
    { id: '1', name: 'New Arrivals', image: require("../assets/nude.jpg") },
    { id: '2', name: 'All', image: require("../assets/all.jpg") },
    { id: '3', name: 'Rings', image: require("../assets/rings.jpg") },
    { id: '4', name: 'Necklaces', image: require('../assets/necklaces.jpg') },
    { id: '5', name: 'Earrings', image: require("../assets/earr.jpg") },
    { id: '6', name: 'Bracelets', image: require("../assets/braclets.jpg") },
    { id: '7', name: 'Hair Clips', image:require("../assets/bands.jpg") },
    { id: '8', name: 'Brooches', image: require("../assets/Broches.jpg") },
  ];



  return (
    <ScrollView showsVerticalScrollIndicator>
    <View>
      <View style={styles.categoriesContainer}>
        {categories.map(({name,image,index }) => (
          <TouchableOpacity
            key={name+index}
            onPress={() => setSelectedCategory(name)}
          >
            <View
              style={[
                styles.category,
                { backgroundColor: selectedCategory === name ? 'lightblue' : 'white' },
              ]}
            >
                 <Text style={styles.categoryName}>{name}</Text>
              <Image source={image} style={styles.categoryImage} />
           
            </View>
          </TouchableOpacity>
        ))}
        
      </View>

  
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
      },
      category: {
        width: 450,
        height: 200,
        position: 'relative',
        marginBottom: 4,
        overflow: 'hidden', // Ensure that the child elements don't overflow the container
      },
      categoryName: {
        opacity: 0.9,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        position: 'absolute',
        bottom: 75, // Adjust the distance from the bottom
        left: 0,
        right: 0,
        textAlign: 'center', // Center the text horizontally
        paddingHorizontal: 10,
        borderRadius: 5,
        zIndex: 1, // Ensure the text is above the image
      },
      
      categoryImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        width: '100%',
        opacity: 0.9,
        zIndex: 0, // Ensure the image is behind the text
      },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
  },
});

export default Collections;
