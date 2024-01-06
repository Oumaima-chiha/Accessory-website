import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import axios from 'axios';




const ConfirmEmail = ({ navigation }) => {



    const emailRef = useRef();
 
  
    const [email, setEmail] = useState('');

  
    const handleChangeEmail = (text) => {
      setEmail(text);
    };
    const sendResetEmail = async () => {
        try {
          const response = await axios.post(`http://192.168.1.3:3000/api/customers/forgotpassword`,  {email} );
          navigation.navigate("code" , { email })
          if (response.status === 200) {
            
          } else {
            console.log('Error sending reset email:', response.status);
          }
        } catch (error) {
          console.error('Error sending reset email:', error);
          if (error.response && error.response.status === 404) {
            console.log('Email not found. Please double-check your email address.');
          } else {
            console.log('Unexpected error:', error.message);
          }
        }
      };

 
    return (
        <ScrollView contentContainerStyle={styles.container}>
         
          
     
    
          <View style={styles.forgotPasswordParent}>
            <Text style={styles.forgotPasswordTitle}>Forgot Password</Text>
    
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter your Email</Text>
              <TextInput
                onChangeText={handleChangeEmail}
                value={email}
                placeholder="example@example.com"
                placeholderTextColor="#c8c8c8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.emailInput}
                ref={emailRef}
              />
            </View>
    
            <TouchableOpacity style={styles.sendResetButtonContainer} onPress={sendResetEmail}>
              <Text style={styles.sendResetButtonText}>Send Reset Email</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    };
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordParent: {
    marginTop: 5,
    padding: 20,
    width: '100%',
    height: '70%',
  },
  forgotPasswordTitle: {

    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {

    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  emailInput: {
    borderWidth: 1.5,
    borderColor: "red",
    borderRadius: 8,
    padding: 16,
  
    fontSize: 18,
    textAlign: 'center',
  },
  sendResetButtonContainer: {
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  sendResetButtonText: {

    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ConfirmEmail;
