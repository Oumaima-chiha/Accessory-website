import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Checkout = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [amount, setAmount] = useState('');
  
    const handlePayment = () => {
      if (!accountNumber || !routingNumber || !amount) {
        Alert.alert('Payment Information', 'Please fill in all fields');
        return;
      }
  
     
      console.log('Payment processed with:', { accountNumber, routingNumber, amount });
      // Handle payment logic with entered bank account details
    };
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Bank Payment Checkout</Text>

    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <MaterialIcons name="account-balance" size={24} color="#777" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Account Number"
          value={accountNumber}
          onChangeText={(text) => setAccountNumber(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="vpn-key" size={24} color="#777" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Routing Number"
          value={routingNumber}
          onChangeText={(text) => setRoutingNumber(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="attach-money" size={24} color="#777" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  paddingHorizontal: 20,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
},
formContainer: {
  width: '100%',
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
},
inputIcon: {
  marginHorizontal: 10,
},
input: {
  flex: 1,
  height: 40,
  paddingHorizontal: 10,
},
payButton: {
  backgroundColor: 'brown',
  paddingVertical: 15,
  borderRadius: 5,
  alignItems: 'center',
},
payButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},
});

export default Checkout;
