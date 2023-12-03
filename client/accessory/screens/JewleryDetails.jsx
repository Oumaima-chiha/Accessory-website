import React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';

const JewelryDetails = ({ route }) => {
  const { item } = route.params;

  const handleAddToCart = () => {
    // Implement logic to add item to cart
  };
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default JewelryDetails;
