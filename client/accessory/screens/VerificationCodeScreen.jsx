
import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity, Platform,
} from "react-native";
import axios from "axios";



const inputs = Array(4).fill("");
let newInputIndex = 0;

const isObjValid = (obj) => {
  return Object.values(obj).every((val) => val.trim());
};

const VerificationCodeScreen = ({ navigation }) => {
  const inputRefs = inputs.map(() => useRef());
  const toastRef = useRef(null);

  const [OTP, setOTP] = useState({ 0: "", 1: "", 2: "", 3: "" });
  const [nextInputIndex, setNextInputIndex] = useState(0);


  const handleChangeText = (text, index) => {
    const newOTP = { ...OTP };
    newOTP[index] = text;
    setOTP(newOTP);

    const lastInputIndex = inputs.length - 1;
    if (!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;

    setNextInputIndex(newInputIndex);
  };

  useEffect(() => {
    inputRefs[nextInputIndex].current.focus();
  }, [nextInputIndex]);

  const verifyEmail = async () => {
    const otp = Object.values(OTP).join("");
    try {
      const response = await axios.get(
        `${ process.env.EXPO_PUBLIC_API_URL}customers/verify/${otp}`
      );

      if (response.status === 200) {

        navigation.navigate("LogIn");
      } else {

        console.log("Verification failed");
      }
    } catch (error) {

      console.error("Error verifying OTP:", error);
    }
  };


  return (
      <View style={Platform.OS === 'web' ? styles.containerWeb : styles.container}>
        <View style={Platform.OS==='web'&& {width:'40%',alignItems:'center'}}>
          <>

      <View style={styles.loginParent}>
        <Text style={styles.login1}>Verification Code</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your Code</Text>
          <View style={styles.codeInputContainer}>
            {inputs.map((inp, index) => (
              <TextInput
                key={index}
                onChangeText={(text) => handleChangeText(text, index)}
                value={OTP[index]}
                placeholder="0"
                placeholderTextColor="#c8c8c8"
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={1}
                style={styles.codeInput}
                ref={inputRefs[index]}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.verifyButtonContainer}
          onPress={verifyEmail}
        >
          <Text style={styles.verifyButtonText}>Verify Code</Text>
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  containerWeb: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginParent: {
    marginTop: 5,
    padding: 20,
    width: "100%",
    height: "70%",
  },
  login1: {

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
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  codeInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor:'red',
    borderRadius: 8,
    padding: 16,

    fontSize: 18,
    textAlign: "center",
    marginRight: 10,
  },
  verifyButtonContainer: {
    backgroundColor:'pink',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  verifyButtonText: {

    fontWeight: "bold",
    fontSize: 20,
  },
});

export default VerificationCodeScreen;
