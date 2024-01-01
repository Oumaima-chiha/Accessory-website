import React, { useState } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
const Checkout = () => {
  const navigation = useNavigation();
  const [paymentType, setPaymentType] = useState(null);
  const handlePayment = () => {
    if (paymentType === null) {
    
      return;
    }
 
 navigation.navigate('PaymentForm', { paymentType });
};
const renderPaymentCard = (type, illustration, title) => {
  const isSelected = paymentType === type;
  return (
    <TouchableOpacity
        style={[
          styles.paymentCard,
          {
            borderColor: isSelected ? 'brown' : '#ccc',
            backgroundColor: isSelected ? '#fff7eb' : 'white',
          },
        ]}
        onPress={() => setPaymentType(type)}
    >
      <View>
        <Image source={illustration} style={styles.cardIllustration} />
        <Text style={[styles.paymentCardTitle, { color: isSelected ? 'brown' : '#333' }]}>{title}</Text>
      </View>
    </TouchableOpacity>
);
};

return (
  <View style={styles.container}>

        <View style={styles.cardContainer}>
          {renderPaymentCard('cashOnDelivery', require('../assets/delivery.jpg'), 'Cash on Delivery')}
          {renderPaymentCard('creditCard', require('../assets/credit-card.jpg'), 'Credit Card')}
          {/* Add more payment cards as needed */}
        </View>

    {paymentType && (
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
    )}
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
    rowGap:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    rowGap:20
  },
  paymentCard: {
    width: '48%',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardIllustration: {
    width: 270,
    height: 217,
    marginBottom: 10,
    resizeMode:'cover',
    borderRadius:10,
  },
  paymentCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
