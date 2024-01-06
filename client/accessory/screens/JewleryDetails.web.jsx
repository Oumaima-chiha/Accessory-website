// JewelryDetails.web.js
import React, { useState, useCallback } from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from '../helpers/dim';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const JewelryDetailsWeb = ({ route }) => {
  const { item } = route.params;
  const [mainImage, setMainImage] = useState(item.main_image);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const navigation = useNavigation();

  const handleAddToCart = async (id) => {
    try {
      const res = await axios.post(process.env.EXPO_PUBLIC_API_URL + "cart/product/2/" + id);
      if (res.status === 201)
        navigation.navigate('cart');
    }
    catch (err) {
      console.error(err)
    }
  };

  const handleImageSelect = (image) => {
    setMainImage(image);
  };

  const renderImageWithCart = useCallback(() => {
    const images = [item.main_image, ...item.extra_images];
    return images.map((image, index) => (
        <View key={index} style={styles.imageContainer}>
          <TouchableOpacity
              onPress={() => handleImageSelect(image)}
              onPressIn={() => setShowAddToCart(true)}
              onPressOut={() => setShowAddToCart(false)}
          >
            <Image source={{ uri: image }} style={styles.additionalImage} resizeMode="cover" />
          </TouchableOpacity>
          {showAddToCart && mainImage === image && (
              <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
          )}
        </View>
    ));
  }, [showAddToCart, mainImage, item]);

  const renderOtherImagesBar = useCallback(() => {
    return (
        <View style={styles.otherImagesBar}>
          <Text style={styles.otherImagesTitle}>See Other Images</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.additionalImagesContainer}>
            {item.extra_images.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => handleImageSelect(image)}>
                  <Image source={{ uri: image }} style={styles.otherImage} resizeMode="cover" />
                </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
    );
  }, [item]);

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageBar}>
          <View style={styles.additionalImagesContainer}>
            {renderImageWithCart()}
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
            <Button title="Add to Cart" onPress={() => handleAddToCart(item.id)} />
          </View>
        </View>
        {renderOtherImagesBar()}
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
    resizeMode: 'contain',
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
  otherImagesBar: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  otherImagesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  otherImage: {
    width: scale(80),
    height: verticalScale(100),
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
  imageContainer: {
    position: 'relative',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    transform: [{ translateX: -50 }],
  },
  addToCartText: {
    color: 'black',
  },
});

export default JewelryDetailsWeb;
