import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet ,Text, ScrollView, SafeAreaView, TextInput} from 'react-native';
import { Images } from '../contants';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../contants";
import { useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons'; 


const MainPage = ({ navigation }) => {
    const [isWomenUnderline, setIsWomenUnderline] = useState(false);
    const [isMenUnderline, setIsMenUnderline] = useState(false);
  
    const toggleWomenUnderline = () => {
      setIsWomenUnderline(!isWomenUnderline);
    };
  
    const toggleMenUnderline = () => {
      setIsMenUnderline(!isMenUnderline);
    };
  
;

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
      
  <View style={styles.topBar}>
    <View style={styles.leftIcon}>
      <MaterialIcons name="account-circle" size={30} color="black" />
    </View>
    <View style={styles.rightIcon}>
      <SimpleLineIcons name="handbag" size={24} color="black" />
    </View>
  </View>


    
      <View style={styles.InputContainer}>
      <TouchableOpacity onPress={() => {}}>
        <AntDesign
          name="search1"
          size={24}
          color={Colors.colorGray_100}
          style={styles.search}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Search..."
        placeholderTextColor={Colors.primaryLightGreyHex}
        style={styles.TextInputContainer}
    
        
      />
    </View>
  
    <View style={styles.topBar}>
    <TouchableOpacity
          style={[styles.button, isWomenUnderline ? styles.underline : null]}
          onPress={toggleWomenUnderline}
        >
          <Text style={[styles.topBarText, isWomenUnderline ? styles.underlineText : null]}>
            women&kids
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isMenUnderline ? styles.underline : null]}
          onPress={toggleMenUnderline}
        >
          <Text style={[styles.topBarText, isMenUnderline ? styles.underlineText : null]}>
            Men
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
  
      <Text style={styles.Text}>Shop By Category</Text>
      {/* Category Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
   
      <View style={styles.categoryBar}>
       
  {/* Category Box - Rings */}
  <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => navigation.navigate('BraceletsScreen')} // Navigate to Bracelets screen on press
        >
             <View style={styles.imageBox}>
          {/* Image for Bracelets */}
          <Image source={Images.EARING} style={styles.categoryImage} />
         
          </View>
          <View style={styles.textOverlay}>
          {/* Text for Bracelets */}
          <Text style={styles.categoryText}>Earings</Text>
         
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => navigation.navigate('BraceletsScreen')} // Navigate to Bracelets screen on press
        >
             <View style={styles.imageBox}>
          {/* Image for Bracelets */}
          <Image source={Images.ACCESSORY} style={styles.categoryImage} />
         
          </View>
          <View style={styles.textOverlay}>
          {/* Text for Bracelets */}
          <Text style={styles.categoryText}>Braclets</Text>
         
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => navigation.navigate('BraceletsScreen')} // Navigate to Bracelets screen on press
        >
             <View style={styles.imageBox}>
          {/* Image for Bracelets */}
          <Image source={Images.HAIRCLIPS} style={styles.categoryImage} />
         
          </View>
          <View style={styles.textOverlay}>
          {/* Text for Bracelets */}
          <Text style={styles.categoryText}>Hair Clips</Text>
          
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => navigation.navigate('BraceletsScreen')} // Navigate to Bracelets screen on press
        >
             <View style={styles.imageBox}>
          {/* Image for Bracelets */}
          <Image source={Images.RING} style={styles.categoryImage} />
         
          </View>
          <View style={styles.textOverlay}>
          {/* Text for Bracelets */}
          <Text style={styles.categoryText}>Rings</Text>
       
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
     
      <View style={styles.separator} />
      
   
   
   
      <View style={styles.shopNowBox}>
        {/* Image */}
        <Image source={Images.MEN} style={styles.shopNowImage} />

        {/* Shop Now Button */}
        <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('ShopNowScreen')}>
          <Text style={styles.shopNowText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewAllContainer}>
      <Text style={styles.viewAllText}>View All</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.bar}>
      <Image source={Images.CHRISTMAS} style={styles.image} />
      <Text style={styles.text}>CHRISTMAS SALE 50% OFF</Text>
  
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonn}>
          <Text style={styles.buttonText}>Click Here</Text>
        </TouchableOpacity>
      </View>
</ScrollView>




      
      

      
      {/* Other components and sections */}
 
   
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
  flex:1,
 
    backgroundColor: '#fff',
    padding: 10,
    marginBottom:10,
 
   
  
  },
  
  categoryBar: {
    flexDirection: 'row',
    paddingVertical:5,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor:"rgba(255, 99, 71, 0.2)",
  

  },


categoryImage: {
    width: 95, 
    height: 95, 
    alignItems:'center',
    justifyContent:'center'
  
  
  },
  textOverlay:{
    alignItems:'center',
    justifyContent:'center'

  },
  

  imageBox: {
    position: 'relative',
    alignItems: 'center',
    width: 95, 
    borderRadius: 50, 
  overflow: 'hidden',
  margin:5,
 

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
    marginRight: 10,

   

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
  backgroundColor:"rgb(106, 90, 205)",
  
  
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

 
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'lightgray', 
  },
 
  topBarText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding:10,
   
  },
  
  image: {
    position: 'absolute',
    top: 0, 
    left: 0,
    right: 0,
    height: 200,
    width: '100%',
    zIndex: 111111, 
  },
  InputContainer: { flexDirection: "row",
  margin: 10,
  borderRadius: 20,
  backgroundColor: "white",
  alignItems: "center",
 
  shadowColor: "black",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.4,
  shadowRadius: 4,
  elevation: 2,
  },
  search: {
    marginRight: 10, 
  },
  TextInputContainer: {
    flex: 1,
    height: 40, 
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    // Add other button styles here
  },
  underline: {
    borderBottomWidth: 2,
    borderColor: 'black',
    // Other styles for underline if needed
  },
  iconContainer: {
    margin: 10,
    paddingBottom: 20,
    flexDirection: 'column',
  
    width: '50%',
    alignItems: 'flex-start', 
    justifyContent: 'flex-end', 
  },
  
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin:5,
   
    



  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // Adjust padding as needed
    // Other styles for the top bar

  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold', 
    alignItems:"center",
    backgroundColor:"rgba(255, 99, 71, 0.2)",
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
    resizeMode:"cover"
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 99, 71, 0.2)',
    padding: 10,
    borderRadius: 8,
    position: 'relative',
  },
  buttonContainer: {
    alignItems: 'center',

  },
  buttonn: {
    backgroundColor:'rgba(255, 99, 71, 0.2)',
  opacity:100,
 
   position: 'absolute',
   bottom: -40,
   left: -5,
   right: 0,
  
   marginBottom: 80,
   paddingHorizontal: 170,

   borderRadius: 5,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
 
});

export default MainPage;
