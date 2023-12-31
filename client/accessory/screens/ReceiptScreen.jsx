// ReceiptScreen.js
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";

// Mock function to simulate fetching receipt data from the backend
const fetchReceiptData = async (receiptId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: receiptId,
                createdAt: new Date().toLocaleDateString(),
                items: [
                    { name: 'Product A', price: 29.99, quantity: 2 },
                    { name: 'Product B', price: 15.99, quantity: 1 },
                    // Add more items as needed
                ],
                totalAmount: 75.97,
            });
        }, 1000); // Simulate a delay of 1 second
    });
};

const ReceiptScreen = ({ route, navigation }) => {
    const [receiptData, setReceiptData] = useState(null);

    useEffect(() => {
        const fetchReceipt = async () => {
            try {
                const receiptId = route.params?.receiptId;
                if (!receiptId) {
                    throw new Error('Invalid receipt ID');
                }

                const data = await fetchReceiptData(receiptId);
                setReceiptData(data);
            } catch (error) {
                console.error('Error fetching receipt data:', error.message);
            }
        };

        fetchReceipt();
    }, [route.params?.receiptId]);

    const downloadReceipt = () => {
        // Replace this with your actual download logic
        console.log('Downloading receipt...');
    };

    if (!receiptData) {
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
                    <Text style={styles.title}>Your Shop Name</Text>
                    <Text style={styles.subtitle}>Order Confirmation</Text>
                </View>
                <FlatList data={receiptData.items} renderItem={renderItem} keyExtractor={(index)=>`item-${index}`}/>


                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>${receiptData.totalAmount.toFixed(2)}</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.note}>Thank you for shopping with us!</Text>

                    {/* Add a button to download the receipt */}
                    <TouchableOpacity style={styles.downloadButton} onPress={downloadReceipt}>
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
