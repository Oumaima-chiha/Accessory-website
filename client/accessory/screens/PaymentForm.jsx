import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CreditCardForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    const handleCardNumberChange = (text) => {
        setCardNumber(text.replace(/[^\d]/g, '')); // Remove non-numeric characters
    };

    const handleExpiryDateChange = (text) => {
        setExpiryDate(text.replace(/[^\d]/g, '').replace(/(\d{2})(\d{0,4})/, '$1/$2')); // Format as MM/YY
    };

    const handleCvvChange = (text) => {
        setCvv(text.replace(/[^\d]/g, '')); // Remove non-numeric characters
    };

    const navigation = useNavigation();

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Billing Information</Text>

            <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={24} color="#777" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={(text) => setFullName(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="#777" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="credit-card" size={24} color="#777" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={handleCardNumberChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="event" size={24} color="#777" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChangeText={handleExpiryDateChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="vpn-key" size={24} color="#777" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    keyboardType="numeric"
                    value={cvv}
                    onChangeText={handleCvvChange}
                />
            </View>

            <View style={styles.checkboxContainer}>
                <MaterialIcons name="check-box" size={24} color="#777" style={styles.checkbox} />
                <Text style={styles.checkboxText}>I agree to the Terms and Conditions</Text>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('ReceiptScreen',{receiptId:1})}>
                <Text style={styles.submitButtonText}>Proceed to Confirmation</Text>
            </TouchableOpacity>
        </View>
    );
};

const CashOnDeliveryForm = () => {
    const [shippingAddress, setShippingAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const navigation = useNavigation();

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

            <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('ReceiptScreen',{receiptId:1})}>
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
