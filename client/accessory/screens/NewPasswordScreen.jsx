import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../contants";
import axios from "axios";



const UpdatePassword = ({ navigation, route }) => {
  const newPasswordRef = useRef();

  const [newPassword, setNewPassword] = useState("");
  const { email } = route.params;

  const handleChangeNewPassword = (text) => {
    setNewPassword(text);
  };

  const updatePassword = async () => {
    try {
      const response = await axios.put(
        process.env.EXPO_PUBLIC_API_URL+"customers/updatepassword",
        { email, newPassword: newPassword }
      );

      if (response.status === 200) {
        navigation.navigate("LogIn");
      } else {
        console.log("Error updating password:", response.status);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <View style={Platform.OS === 'web' ? styles.containerWeb : styles.container}>
    <View style={Platform.OS==='web'&& {width:'40%',alignItems:'center'}}>
      <>
      <View style={styles.updatePasswordParent}>
        <Text style={styles.updatePasswordTitle}>Update Password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter the New Password</Text>
          <TextInput
            onChangeText={handleChangeNewPassword}
            value={newPassword}
            placeholder="Enter your new password"
            returnKeyType="done"
            placeholderTextColor="#c8c8c8"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.passwordInput}
            ref={newPasswordRef}
          />
        </View>
        <TouchableOpacity
          style={styles.updatePasswordButtonContainer}
          onPress={updatePassword}
        >
          <Text style={styles.updatePasswordButtonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
      </>
      </View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  containerWeb: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
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
    borderColor: "red",
    borderRadius: 8,
    padding: 16,
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    textAlign: "center",
  },
  updatePasswordButtonContainer: {
    backgroundColor: "red",
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

export default UpdatePassword;
