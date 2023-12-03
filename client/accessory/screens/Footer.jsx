import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.contact}>Contact Us:</Text>
      <Text style={styles.contactInfo}>Email: example@example.com</Text>
      <Text style={styles.contactInfo}>Phone: +1234567890</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f0f0f0', // Background color of the footer
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  contact: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default Footer;
