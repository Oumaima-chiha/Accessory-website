import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,ImageBackground} from "react-native";
import { Images } from "../contants";
import { useCustomerSignupMutation } from "../services/modules/users";

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [triggerSignUp,result]=useCustomerSignupMutation()
    const [fullName, setFullName] = useState("");
  
    const handleSignUp = () => {
     
      console.log("Email:", email);
      console.log("Password:", password);
      triggerSignUp({
        fullname:fullName, email, password 
        
      })
     
    };
  
    const handleForgotPassword = () => {
      
      console.log("Forgot password clicked");
    };  const handleLogIn = () => {
        navigation.navigate('LogIn');
      };

  return (
    

    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
      />
       {/* <TextInput
        style={styles.input}
        placeholder="phone number"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      /> */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogIn}>
        <Text style={styles.linkText}>Log In</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
 
  title: {
    fontSize: 35,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "brown",
    width: "100%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  linkText: {
    marginTop: 10,
    color: "black",
    textDecorationLine: "underline",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default SignUp;
