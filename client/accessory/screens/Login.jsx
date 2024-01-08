// Login.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useCustomerSigninMutation } from "../services/modules/users";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [triggerSignIn, { isLoading, data }] = useCustomerSigninMutation();

  const handleLogin = async () => {
    try{
    if (email !== '' && password !== '') {
      const resp= await triggerSignIn({
        signinData: {
          email: email,
          password: password
        }
      }).unwrap();

      if(resp.token)
      {
            navigation.navigate("home");

      }
    }

  }
  catch(err){
    console.log(err)
  }
  }

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    navigation.navigate("email");
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  console.log(Platform.OS)

  return (
      <View style={Platform.OS === 'web' ? styles.containerWeb : styles.container}>
        <View style={{width:Platform.OS==='web'?'40%':'80%',alignItems:'center'}}>
          <>
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
            </>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  containerWeb: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
});

export default Login;
