import React, { useState,useCallback } from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from '../helpers/dim';

const JewelryDetails = ({ route }) => {
  const { item } = route.params;
  const [mainImage, setMainImage] = useState(item.main_image);

  const handleAddToCart = () => {
    // Implement logic to add item to cartrr
  };

  const renderAdditionalImages = useCallback(() => {
    const images = [item.main_image, ...item.extra_images];
    return images.filter(image => image !== mainImage).map((image, index) => (
      <TouchableOpacity key={index} onPress={() => handleImageSelect(image)}>
        <Image source={{ uri: image }} style={styles.additionalImage} resizeMode="cover" />
      </TouchableOpacity>
    ));
  }, [mainImage]);

  const handleImageSelect = (mainImage) => {
    setMainImage(mainImage);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageBar}>
        <View style={styles.additionalImagesContainer}>
          {renderAdditionalImages()}
        </View>
        <TouchableOpacity onPress={() => handleImageSelect(item.main_image)}>
          <Image source={{ uri: mainImage }} style={styles.mainImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <View style={styles.cartFrame}>
          <AntDesign name="shoppingcart" size={24} color="black" />
          <Button title="Add to Cart" onPress={handleAddToCart} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginVertical: 20,
  },
  imageBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  additionalImagesContainer: {
    marginRight: moderateScale(10),
    alignItems: 'flex-start',
  },
  mainImage: {
    width: scale(250),
    height: verticalScale(380),
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  additionalImage: {
    width: scale(100),
    height: verticalScale(120),
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
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
  cartFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default JewelryDetails;