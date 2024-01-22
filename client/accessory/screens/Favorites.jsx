import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "../services/axiosInterceptor";

const Favorites = () => {
  const [favoriteList,setFavoriteList]=useState();
  const fetchData=async ()=>{
    try {
      const resp=await axios.get('jewelry/favorites')
      if (resp.status === 200) {
        setFavoriteList(resp.data);
        console.log(resp.data);
      }
    }
    catch (err)
    {
     console.log(err)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  const removeFromFavorites= async (id) => {
    try {
      const res = await axios.delete(
          "jewelry/favorite/" + id
      );
      if (res.status === 204)
        setFavoriteList((prev) => {
          const filteredItems = prev?.items?.filter((item) => item.id !== id);
          return { ...prev, items: filteredItems };
        });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
      }
      console.log(error.message);
    }
  };
  const removeAllFavorites= async () => {
    try {
      const res = await axios.delete(
          "jewelry/favorites"
      );
      if (res.status === 204)
        setFavoriteList((prev) => {
          return { ...prev, items: [],totalFavorites:0 };
        });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
      }
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons name="heart" size={40} color="#FF6F61" />
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>Discover and save your favorite items</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD', // Light background color
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333', // Dark text color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666', // Slightly darker text color
    textAlign: 'center',
    marginBottom: 20,
  },
  // Add more styles as needed
});

export default Favorites;
