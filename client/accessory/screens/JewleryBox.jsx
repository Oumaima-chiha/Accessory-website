import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Images } from '../contants';


const JewelryBox = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Box 1 */}
        <View style={styles.box}>
          <Image
            source={Images.RINGS}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$100</Text>
          <Text style={styles.description}>Description of the jewelry piece goes here</Text>
        </View>

        {/* Box 2 */}
        <View style={styles.box}>
          <Image
            source={Images.RING}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$150</Text>
          <Text style={styles.description}>Description of another jewelry piece goes here</Text>
        </View>
        <View style={styles.box}>
          <Image
            source={Images.RIING}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$100</Text>
          <Text style={styles.description}>Description of the jewelry piece goes here</Text>
        </View>

        {/* Box 2 */}
        <View style={styles.box}>
          <Image
            source={Images.EARINGS}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$150</Text>
          <Text style={styles.description}>Description of another jewelry piece goes here</Text>
        </View>
        <View style={styles.box}>
          <Image
            source={Images.HAIRCLIPS}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$100</Text>
          <Text style={styles.description}>Description of the jewelry piece goes here</Text>
        </View>

        {/* Box 2 */}
        <View style={styles.box}>
          <Image
            source={Images.EARING}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$150</Text>
          <Text style={styles.description}>Description of another jewelry piece goes here</Text>
        </View>
        <View style={styles.box}>
          <Image
            source={Images.RINGS}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$100</Text>
          <Text style={styles.description}>Description of the jewelry piece goes here</Text>
        </View>

        {/* Box 2 */}
        <View style={styles.box}>
          <Image
            source={Images.RING}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$150</Text>
          <Text style={styles.description}>Description of another jewelry piece goes here</Text>
        </View>
          <View style={styles.box}>
          <Image
            source={Images.RINGS}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$100</Text>
          <Text style={styles.description}>Description of the jewelry piece goes here</Text>
        </View>

        {/* Box 2 */}
        <View style={styles.box}>
          <Image
            source={Images.RING}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$150</Text>
          <Text style={styles.description}>Description of another jewelry piece goes here</Text>
        </View>
        <View style={styles.box}>
          <Image
            source={Images.RIING}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$100</Text>
          <Text style={styles.description}>Description of the jewelry piece goes here</Text>
        </View>

        {/* Box 2 */}
        <View style={styles.box}>
          <Image
            source={Images.EARINGS}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.price}>$150</Text>
          <Text style={styles.description}>Description of another jewelry piece goes here</Text>
        </View>


        {/* Repeat additional boxes as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap', // Allow items to wrap to the next line
    padding: 10,
  },
  box: {
    width: '45%', // Adjust as needed to leave some space between the boxes
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10, // Add some space between boxes
  },
  image: {
    width: '100%',
    height: 150, // Adjust the height as needed
    borderRadius: 8,
    marginBottom: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    textAlign: 'center',
  },
});

export default JewelryBox;
