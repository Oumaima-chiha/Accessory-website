// ReceiptScreen.js
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";
import downloadReceipt from "../services/receiptService";

// Mock function to simulate fetching receipt data from the backend


const ReceiptScreen = ({ route, navigation }) => {


    const orderSummary = route.params?.orderSummary;

    const HandleDownloadReceipt =async () => {
        try {
            console.log('Downloading receipt...');
            await downloadReceipt(orderSummary?.orderId)
        }
        catch (err){
            console.log(err)
        }
    };

    if (!orderSummary) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }
const renderItem=({item})=>(   <View  style={styles.item}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
</View>)
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.itemsContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>{orderSummary.customer.name}'s Shop</Text>
                <Text style={styles.subtitle}>Order Confirmation</Text>
            </View>
            <FlatList
                data={orderSummary.cartItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => `item-${index}`}
            />

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>${orderSummary.totalAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.note}>Thank you for shopping with us!</Text>

                {/* Add a button to download the receipt */}
                <TouchableOpacity style={styles.downloadButton} onPress={HandleDownloadReceipt}>
                    <MaterialIcons name="cloud-download" size={24} color="white" />
                    <Text style={styles.downloadButtonText}>Download Receipt</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: '#888',
    },
    itemsContainer: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    itemName: {
        fontSize: 16,
    },
    itemQuantity: {
        fontSize: 16,
        color: '#888',
    },
    itemPrice: {
        fontSize: 16,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        paddingTop: 10,
        marginTop: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        borderTopWidth: 1,
        paddingTop: 10,
    },
    note: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    downloadButton: {
        marginTop: 20,
        backgroundColor: 'brown',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 5,
    },
    downloadButtonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
});

export default ReceiptScreen;
