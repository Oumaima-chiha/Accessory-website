import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const JewelryItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.box} onPress={() => onPress(item)}>
      <Image source={{ uri: item.main_image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

const JewelryBox = () => {
  const [jewelryItems, setJewelryItems] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/api/Jewelry`);
      if (response.status === 200) {
        setJewelryItems(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching jewelry items:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate('details', { item });
  };

  const renderItem = ({ item }) => (
    <JewelryItem item={item} onPress={handleItemPress} />
  );

  return (
    <FlatList
      data={jewelryItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    width: '45%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  description: {
    textAlign: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
});

export default JewelryBox;
