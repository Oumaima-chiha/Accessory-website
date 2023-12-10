import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet ,Text, ScrollView, SafeAreaView, TextInput} from 'react-native';
import { Images } from '../contants';


const MainPage = ({ navigation }) => {

;

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
          <View style={styles.topBar}>
        <View style={styles.profileIcon} />
      </View>
         <View style={styles.header}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBar} placeholder="Search..." />
      </View>
      </View>
    <View style={styles.container}>
        
    <View style={styles.topBar}>
        <Text style={styles.topBarText}>women&kids</Text>
        <Text style={[styles.topBarText, styles.underline]}>Men</Text>
      </View>
      <View style={styles.separator} />
  
     
      {/* Category Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.categoryBar}>
        {/* Category Box - Rings */}
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => navigation.navigate('RingsScreen')} // Navigate to Rings screen on press
        >
          <View style={styles.imageBox}>
          
          <Image source={Images.EARING} style={styles.categoryImage} />
          <View style={styles.textOverlay}>
          <Text style={styles.categoryText}>Rings</Text>
            <View style={styles.underline} />
            </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => navigation.navigate('BraceletsScreen')} // Navigate to Bracelets screen on press
        >
             <View style={styles.imageBox}>
          {/* Image for Bracelets */}
          <Image source={Images.HAIRCLIPS} style={styles.categoryImage} />
          <View style={styles.textOverlay}>
          {/* Text for Bracelets */}
          <Text style={styles.categoryText}>Bracelets</Text>
          <View style={styles.underline} />
          </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => navigation.navigate('BraceletsScreen')} // Navigate to Bracelets screen on press
        >
             <View style={styles.imageBox}>
          {/* Image for Bracelets */}
          <Image source={Images.HAIRCLIPS} style={styles.categoryImage} />
          <View style={styles.textOverlay}>
          {/* Text for Bracelets */}
          <Text style={styles.categoryText}>Bracelets</Text>
          <View style={styles.underline} />
          </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => navigation.navigate('BraceletsScreen')} // Navigate to Bracelets screen on press
        >
             <View style={styles.imageBox}>
          {/* Image for Bracelets */}
          <Image source={Images.HAIRCLIPS} style={styles.categoryImage} />
          <View style={styles.textOverlay}>
          {/* Text for Bracelets */}
          <Text style={styles.categoryText}>Bracelets</Text>
          <View style={styles.underline} />
          </View>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
     
      <View style={styles.separator} />
      
   
   
   
      <View style={styles.shopNowBox}>
        {/* Image */}
        <Image source={Images.ACCESSORY} style={styles.shopNowImage} />

        {/* Shop Now Button */}
        <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('ShopNowScreen')}>
          <Text style={styles.shopNowText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewAllContainer}>
      <Text style={styles.viewAllText}>View All</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.shopNowBox}>
        {/* Image */}
        <Image source={Images.EARINGS} style={styles.shopNowImage} />

        {/* Shop Now Button */}
        <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('ShopNowScreen')}>
          <Text style={styles.shopNowText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
     
      </ScrollView>
      
      

      
      {/* Other components and sections */}
    </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
  
    

    backgroundColor: '#fff',
    padding: 10,
    marginBottom:10,
  
  },
  
  categoryBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',

  },
  categoryBox: {
    alignItems: 'relative',
    marginRight: 10,
  
  },
  categoryImage: {
    width: 150,
    height: 150, 
    marginBottom: 5, 
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageBox: {
    position: 'relative',
    alignItems: 'center',
    width: 150, 
   

  
  
  },
  textOverlay: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  underline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 60,
    marginBottom: 5,
  },
  shopNowBox: {
 
    alignItems: 'center',
    position: 'relative',
   

  },
  shopNowImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
    backgroundColor: 'green',
    
  },
  shopNowButton: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: "hsla(0, 100%, 30%, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  shopNowText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    width: '100%',
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 20,
  
  
  },
  underline: {
    textDecorationLine: 'underline',
  },

  viewAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    
  },
  viewAllContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    width: '100%', 
  },
  searchBar: {
    height: 40,
    margin: 10,
    marginTop: 210, 
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
 
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'lightgray', 
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    width: '90%',

  },
  topBarText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding:10,
   
  },
  
});

export default MainPage;
