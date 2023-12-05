import React ,{useState} from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Images } from '../contants';
import { AntDesign } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from '../helpers/dim';

const JewelryDetails = ({ route }) => {
  const {name, main_image, description,category,status } = route.params.jewelry;

  const handleAddToCart = () => {
    // Implement logic to add item to cart
  };
 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageBar}>
        <TouchableOpacity onPress={() =>handleItemPress(main_image)}>
          <Image source={item.main_image} style={styles.mainImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Price: {item.price}</Text>
        <View style={styles.cartFrame}>
         
        <AntDesign name="shoppingcart" size={24}  color="black"/>
            <Button title="Add to Cart" onPress={handleAddToCart} />
          </View>
      </View>
  
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginVertical:20
  },
  imageBar: {
    flexDirection: 'row',
    justifyContent:'center',
    marginBottom: 20,
  },
  additionalImagesContainer: {
    marginRight:moderateScale(10),
    alignItems: 'flex-start',
  },
  mainImage: {
    width: scale(250),
    height: verticalScale(380),
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'cover', // Added resizeMode for clarity

  },
  additionalImage: {
    width: scale(100),
    height: verticalScale(120),
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover', // Added resizeMode for clarity
  },
  
  details: {
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  addToCartContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  cartFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  cartIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    // Additional styling for cart icon
  },
  // Reviews section styles...
});

export default JewelryDetails;
