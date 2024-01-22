import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "../services/axiosInterceptor";


const CashOnDeliveryForm = () => {
    const [shippingAddress, setShippingAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const navigation = useNavigation();



    const handleSubmit = async () => {
        try {
          // Form validation
          if (!shippingAddress || !contactNumber || !state || !city || !country || !postalCode) {
            // Show an alert or some UI indication that all fields are required
            return;
          }
      
          const paymentMethod = 'CASH_ON_DELIVERY';
      
          // Construct the shipping address object
          const shippingAddressPayload = {
            address: shippingAddress,
            city,
            state,
            postalCode,
            country,
            phoneNumber: contactNumber,
          };
      
          const paymentPayload = {
            paymentMethod,
            shippingAddress: shippingAddressPayload,
          };
      
          // Make the API request using Axios
          const response = await axios.post('pay/process', paymentPayload);
      
          if (response.data) {
            const receiptId = response.data.orderId;
            // Use the actual receiptId obtained from the API response
            navigation.navigate('ReceiptScreen', { receiptId,orderSummary:response.data });
          }
        } catch (error) {
          console.error('Error submitting payment:', error.message);
          // Handle error appropriately, e.g., show an error message to the user
        }
      
      };
      
    

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Shipping Information</Text>
            <View style={styles.inputContainer}>
                <MaterialIcons name="location-on" size={24} color="#777" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Shipping Address"
                    value={shippingAddress}
                    onChangeText={(text) => setShippingAddress(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="phone" size={24} color="#777" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    keyboardType="phone-pad"
                    value={contactNumber}
                    onChangeText={(text) => setContactNumber(text)}
                />
            </View>
            
            <View style={styles.inputContainer}>
            <MaterialIcons name="location-city" size={24} color="black" />
                <TextInput
                    style={styles.input}
                    placeholder="country"
                  
                    value={country}
                    onChangeText={(text) => setCountry(text)}
                />
            </View>
            
            <View style={styles.inputContainer}>
            <MaterialIcons name="location-city" size={24} color="black" />
                <TextInput
                    style={styles.input}
                    placeholder="city"
                    
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
            </View>
            
            <View style={styles.inputContainer}>
  
                <TextInput
                    style={styles.input}
                    placeholder="state"
                 
                    value={state}
                    onChangeText={(text) => setState(text)}
                />
            </View>
            <View style={styles.inputContainer}>
      
                <TextInput
                    style={styles.input}
                    placeholder="postal Code"
                  
                    value={postalCode}
                    onChangeText={(text) => setPostalCode(text)}
                />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Proceed to Confirmation</Text>
            </TouchableOpacity>
        </View>
    );
};

const PaymentForm = ({ route }) => {
    const { paymentType } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {paymentType === 'creditCard' ? <CreditCardForm /> : null}
            {paymentType === 'cashOnDelivery' ? <CashOnDeliveryForm /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    formContainer: {
        marginBottom: 20,
    },
    formLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 8,
        paddingLeft: 10,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#333',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxText: {
        fontSize: 16,
        color: '#333',
    },
    submitButton: {
        backgroundColor: 'brown',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PaymentForm;
