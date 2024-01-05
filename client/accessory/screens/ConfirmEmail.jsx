import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native";

const ConfirmEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const emailRef = useRef();

  const handleChangeEmail = (text) => {
    setEmail(text);
  };

  const sendResetEmail = () => {
    // Implement logic to send reset email using the entered email (email state)
    console.log("Reset email sent to:", email);
    // Reset the email input after sending the reset email
    setEmail('');
    emailRef.current.clear(); // Clear the TextInput field
    navigation.navigate("pass")
  };

  return (
    <View style={styles.container}>
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
    </View>
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
        borderColor: "gold",
        borderRadius: 8,
        padding: 16,

        fontSize: 18,
        textAlign: 'center',
      },
      sendResetButtonContainer: {
        backgroundColor: "pink",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 15,
        marginTop: 20,
        borderColor: "gold",
      },
      sendResetButtonText: {
        borderColor: "gold",
        fontWeight: 'bold',
        fontSize: 20,
      },
});

export default ConfirmEmail;
