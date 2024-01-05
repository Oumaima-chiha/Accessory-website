
import * as React from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const NewPassword = () => {
  const handleButtonPress = () => {
    // Implement the logic to send a password reset email here.
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.updatePasswordParent}>
      <Text style={styles.updatePasswordTitle}>Update Password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter the New Password</Text>
        <TextInput
          
          placeholder="Enter your new password"
          returnKeyType="done"
          placeholderTextColor="#c8c8c8"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.passwordInput}
        
        />
      </View>
      <TouchableOpacity
        style={styles.updatePasswordButtonContainer}
       
      >
        <Text style={styles.updatePasswordButtonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    updatePasswordParent: {
      marginTop: 5,
      padding: 20,
      width: "100%",
      height: "70%",
    },
    updatePasswordTitle: {

      fontWeight: "bold",
      fontSize: 30,
      textAlign: "center",
      marginBottom: 50,
    },
    inputContainer: {
      marginBottom: 30,
    },
    label: {
 
      fontSize: 18,
      marginBottom: 10,
      textAlign: "center",
    },
    passwordInput: {
      borderWidth: 1.5,
      borderColor: "gold",
      borderRadius: 8,
      padding: 16,
    
      fontSize: 18,
      textAlign: "center",
    },
    updatePasswordButtonContainer: {
      backgroundColor: "pink",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      padding: 15,
      marginTop: 20,
    },
    updatePasswordButtonText: {

      fontWeight: "bold",
      fontSize: 20,
    },
  });

export default NewPassword;
