import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Favorites = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons name="heart" size={40} color="#FF6F61" />
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>Discover and save your favorite items</Text>
        {/* Add more components or styling as needed */}
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
