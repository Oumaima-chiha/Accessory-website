import React, { useState, useCallback } from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from '../helpers/dim';
import { useNavigation } from '@react-navigation/native';
import axios from "../services/axiosInterceptor";
import {useSelector} from "react-redux";
import {isLoggedInSelector} from "../store/user/selectors";
import Toast from "react-native-toast-message";
import { useIsFocused } from '@react-navigation/native';
import Colors from '../contants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const JewelryDetails = ({ route }) => {
  const { item } = route.params;
  const [mainImage, setMainImage] = useState(item.main_image);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const navigation = useNavigation();
  const isLoggedIn=useSelector(isLoggedInSelector);
  const isFocused = useIsFocused();



  const handleAddToCart = async() => {
    try{
      if(!isLoggedIn)
      {
        navigation.navigate('login');
        return;
      }
    const res = await axios.post("cart/product/" +item.id )
    if (res.status===201)
    navigation.navigate('cart');
    }
    catch (err)
    {
      console.error(err)
    }

  };
  const handleFavorite = async() => {
    try{
      if(!isLoggedIn)
      {
        navigation.navigate('login');
        return;
      }
      const res = await axios.post("jewelry/favorite/" +item.id )
      if (res.status===200)
        Toast.show({
          type: 'success',
          position: 'top',
          text1: res.data.message
        })
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



  return (
   
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageBar}>
        <View style={styles.additionalImagesContainer}>
          {renderImageWithCart()}
        </View>
        <TouchableOpacity onPress={() => handleImageSelect(item.main_image)} >
                {/* Add to Favorites */}
      <TouchableOpacity onPress={handleFavorite} style={styles.iconFrame}>
        <MaterialIcons name="favorite-border" size={24} color={isFocused  ? Colors.DEFAULT_RED : "black"} />
      </TouchableOpacity>

          <Image source={{ uri: mainImage }} style={styles.mainImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Price: {item.price} TND 💵</Text>
        <View style={styles.containerr}>


      <TouchableOpacity
              style={styles.proceedButton}
              onPress={handleAddToCart}
            >

              <Text style={styles.proceedButtonText}>Add To Cart 🛒</Text>
            </TouchableOpacity>



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

  proceedButton: {
    paddingVertical: 12,
    marginVertical:32,
    width:360,
    height: 40,
    backgroundColor: 'brown',
    borderRadius: 5,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default JewelryDetails;
