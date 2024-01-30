import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from '../services/axiosInterceptor';



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
const Collections = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [jewelryItems,setJewelryItems]=useState([]);
  const [showList,setShowList]=useState(false)

  const fetchCategories = async () => {
    try {
      const response = await axios.get( process.env.EXPO_PUBLIC_API_URL+"Jewelry/tags");
      if (response.status === 200) {
        setCategories(response.data);
        console.log(response.data);
      }

    } catch (error) {
      console.error('Error fetching jewelry items:', error);
    }

  };
  const fetchByTag = async (tagId) => {
    try {
      const response = await axios.get( process.env.EXPO_PUBLIC_API_URL+"Jewelry/tag/"+tagId);
      if (response.status === 200) {
        setJewelryItems(response.data);
        setShowList(true)
        console.log(response.data);
      }

    } catch (error) {
      console.error('Error fetching jewelry items:', error);
    }

  };
  useEffect(()=>{
    fetchCategories()

  },[])
  const handleItemPress = (item) => {
    navigation.navigate('details', { item });
  };

  const renderItem = ({ item }) => (
    <JewelryItem item={item} onPress={handleItemPress} />
  );


  return showList ? (
      <FlatList
      data={jewelryItems}

      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.flatListContent}

    />
    
    ):(
    <ScrollView showsVerticalScrollIndicator>
    <View>
      <View style={styles.categoriesContainer}>
        {categories.map(({name,image,id}) => (
          <TouchableOpacity
            key={name+id}
            onPress={() => fetchByTag(id)}
          >
            <View
              style={[
                styles.category,
                { backgroundColor: 'white' },
              ]}
            >
                 <Text style={styles.categoryName}>{name}</Text>
              <Image source={{uri:`${process.env.EXPO_PUBLIC_API_URL}${image}`}} style={styles.categoryImage} />

            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    </ScrollView>)
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
  columnWrapper: {
    justifyContent: Platform.OS==='web'? "space-around":'space-between',
    marginVertical: 8,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
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
});

export default Collections;
