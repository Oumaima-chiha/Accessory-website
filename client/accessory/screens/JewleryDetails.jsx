import React, { useState, useCallback } from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from '../helpers/dim';
import cart from "./Cart";
import { navigation,useNavigation } from '@react-navigation/native';
import axios from "../services/axiosInterceptor";
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector} from "react-redux";
import {isLoggedInSelector} from "../store/user/selectors";

const JewelryDetails = ({ route }) => {
  const { item } = route.params;
  const [mainImage, setMainImage] = useState(item.main_image);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const navigation = useNavigation();
  const isLoggedIn=useSelector(isLoggedInSelector)


  const handleAddToCart = async(id) => {
    try{
      if(!isLoggedIn)
      {
        navigation.navigate('login');
        return;
      }
    const res = await axios.post("cart/product/" +id )
    if (res.status===201)
    navigation.navigate('cart');
    }
    catch (err)
    {
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

      </View>
    ));
  }, [showAddToCart, mainImage, item]);

  const renderOtherImagesBar = useCallback(() => {
    return (
      <View style={styles.otherImagesBar}>
        <Text style={styles.otherImagesTitle}>See Other Images</Text>
        <FlatList
          data={item.extra_images}
          renderItem={({ item: image }) => (
            <TouchableOpacity onPress={() => handleImageSelect(image)} >
              <Image source={{ uri: image }} style={styles.otherImage} resizeMode="cover" />
            </TouchableOpacity>
          )}
          keyExtractor={(image, index) => `${image}_${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.additionalImagesContainer}
        />
      </View>
    );
  }, [item]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageBar}>
        <View style={styles.additionalImagesContainer}>
          {renderImageWithCart()}
        </View>
        <TouchableOpacity onPress={() => handleImageSelect(item.main_image)} >
                {/* Add to Favorites */}
      <View style={styles.iconFrame}>
        <MaterialIcons name="favorite-border" size={24} color="black" />
      </View>

          <Image source={{ uri: mainImage }} style={styles.mainImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>
          {/* Add to Cart */}
          <TouchableOpacity style={styles.cartIcon} onPress={() => handleAddToCart(item.id)}>
        <AntDesign name="shoppingcart" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <View style={styles.containerr}>
  


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

  otherImagesBar: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  otherImagesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
  },

  containerr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,

  },
  iconFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    position:'absolute',
    right:10,
    top:10,
    height:50,
    width:50,
    borderRadius: 25, // Make it a circle
    borderWidth: 2,
    //borderColor: 'brown',
    zIndex:9

  },
  cartIcon: {
    alignItems: 'center',
    justifyContent:'center',
    height:50,
    width:50,
    borderRadius: 25,
    zIndex:9,
    
  }
});

export default JewelryDetails;
