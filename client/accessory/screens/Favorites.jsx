import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "../services/axiosInterceptor";
import {scale} from "../helpers/dim";
import Toast from "react-native-toast-message";

const Favorites = () => {
  const [favoriteList, setFavoriteList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const resp = await axios.get('jewelry/favorites');
      if (resp.status === 200) {
        setFavoriteList(resp.data);
        console.log(favoriteList)
      }
    } catch (err) {
      console.log(err);
      setError(err.message || 'An error occurred while fetching favorites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeFromFavorites = async (id) => {
    try {
      const res = await axios.delete(`jewelry/favorite/${id}`);
      if (res.status === 200) {
        console.warn(res)
        Toast.show({
          type: 'success',
          position: 'top',
          text1: res.data.message
        })
        setFavoriteList((prev) => {
          const updatedItems = prev?.items?.filter((item) => item.id !== res.data.removedId);
          return { ...prev, items: updatedItems, totalFavorites: prev.totalFavorites - 1 };
        });
      }
    } catch (error) {
      console.log(error);
      // Handle errors as needed
    }
  };

  const removeAllFavorites = async () => {
    try {
      const res = await axios.delete('jewelry/favorites');
      if (res.status === 200) {
        console.warn(res)
        Toast.show({
          type: 'success',
          position: 'top',
          text1: res.data.message
        })
        setFavoriteList((prev) => ({ ...prev, items: [], totalFavorites: 0 }));
      }
    } catch (error) {
      console.log(error);
      // Handle errors as needed
    }
  };

  const renderFavoriteItem = ({ item }) => (
      <View style={styles.favoriteItemContainer}>
        <View style={styles.favoriteItemContent}>
          <Image source={{ uri: item.jewelry.main_image }} style={styles.jewelryImage} />
          <View style={styles.jewelryDetails}>
            <Text style={styles.jewelryName}>{item.jewelry.name}</Text>
            {item.description && <Text style={styles.jewelryDescription}>{item.jewelry.description}</Text>}
            <Text style={styles.jewelryPrice}>Price: ${item.jewelry.price}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => removeFromFavorites(item.jewelry.id)}>
          <MaterialCommunityIcons name="heart-off" size={24} color="#FF6F61" />
        </TouchableOpacity>
      </View>
  );

  const renderFavoriteList = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!favoriteList || !favoriteList.items || favoriteList.items.length === 0) {
      return <Text style={styles.emptyListText}>Your favorites list is empty</Text>;
    }

    return (
        <>
          <FlatList
              data={favoriteList.items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderFavoriteItem}
              style={{width:scale(375)}}
          />
          <TouchableOpacity onPress={removeAllFavorites}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </>
    );
  };


  return (
      <SafeAreaView style={styles.contentContainer}>
          <MaterialCommunityIcons name="heart" size={40} color="#FF6F61" style={styles.heartIcon} />
          <Text style={styles.title}>Your Favorites</Text>
          <Text style={styles.subtitle}>Discover and save your favorite items</Text>

          {renderFavoriteList()}

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FDFDFD',
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
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  clearAllText: {
    color: '#FF6F61',
    marginTop: 10,
  },
  emptyListText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
  favoriteItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginHorizontal:20
  },
  favoriteItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  },
  jewelryImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  jewelryDetails: {
    flex: 1,
  },
  jewelryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jewelryDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  jewelryPrice: {
    fontSize: 16,
    color: '#333',
  },
});

export default Favorites;
