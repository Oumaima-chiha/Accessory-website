// SplashScreen.js
import React ,{useState}from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Images, Fonts } from "../contants";

const LandingPage = ({ navigation }) => {
    const [buttonPressed, setButtonPressed] = useState(false);
  const handleGetStarted = () => {
    setButtonPressed(true)
    
    navigation.navigate('nav'); 
  };

  return (
    <ImageBackground
    source={Images.ACCESSORY}
      style={styles.background}
    >
      <View style={styles.container}>
        
        <Text style={styles.title}>Noble Elegance </Text>
        <Text style={styles.motivationText}>
          Refine your look,{'\n'}
          <Text style={styles.highlightedText}>elevate your style.</Text>{'\n'}
          Shop elegance today.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}
         onPress={handleGetStarted}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity or color overlay
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "gold",
    paddingVertical: 15,
    paddingHorizontal: 80,
    position: "center",
    bottom: -200,
    left: 10, 
  },
  motivationText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },
  highlightedText: {
    fontWeight: 'bold',
    color: 'gold',
  },
  
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default LandingPage;
