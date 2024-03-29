import React, { useState, useEffect } from 'react';
import {FlatList, StyleSheet, Image, Text, TouchableOpacity, Platform, Animated,View} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const JewelryItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.box} onPress={() => onPress(item)}>
      <Image source={{ uri: item.main_image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}TND 💵</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

const JewelryBox = ({searchTerm,selectedCategory,scrollY}) => {
  const [jewelryItems, setJewelryItems] = useState([]);
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);





  const fetchData = async () => {
    try {
      const response = await axios.get( process.env.EXPO_PUBLIC_API_URL+"Jewelry");
      if (response.status === 200) {
        setJewelryItems(response.data);
        setFilterData(response.data);
        console.log(response.data);
      }

    } catch (error) {
      console.error('Error fetching jewelry items:', error);
    }

  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if(searchTerm && searchTerm !== '') {
      const newData = jewelryItems.filter((elem) =>
        elem.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterData(newData);
      console.log(newData)
      console.log(searchTerm)
    } else {
      setFilterData(jewelryItems);
      console.log(jewelryItems)
    }
  }, [searchTerm]);
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilterData(jewelryItems);
    } else {
      const filteredList = jewelryItems.filter((elem) => {
        if (Array.isArray(elem.category)) {
          const foundCategory = elem.category.find(
            (category) =>
              category &&
              typeof category === "string" &&
              category.toLowerCase() === selectedCategory.toLowerCase()
          );
          return foundCategory !== undefined;
        }
        return false;
      });
      setFilterData(filteredList);
    }
  }, [selectedCategory]);



  const handleItemPress = (item) => {
    navigation.navigate('details', { item });
  };

  const renderItem = ({ item }) => (
    <JewelryItem item={item} onPress={handleItemPress} />
  );

  return (
    <FlatList
      data={filterData}

      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={Platform.OS==='web'?4:2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.flatListContent}
      ListFooterComponent={()=><View style={styles.footer}/>}
      showsVerticalScrollIndicator
        { ...(scrollY && {onScroll:Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })})}

    />
  );
};

const styles = StyleSheet.create({
  box: {
    width: Platform.OS==='web'?'20%':'45%',
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
    justifyContent: Platform.OS==='web'? "space-around":'space-between',
    marginVertical: 8,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
  footer:{
    height:400
  }
});

export default JewelryBox;
