import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const user = useContext(useContext);

  const [cart, setCart] = useState([]);
  const fetchAllCartItems = async () => {
    console.log(user);
    try {
      const { data } = await axios.get("http://192.168.1.3:3000/api/cart/2");
      if (data) setCart(data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllCartItems();
  }, []);
  const removeFromCart = async (id) => {
    try {
      const res = await axios.delete(
        "http://192.168.1.3:3000/api/cart/delete/2/" + id
      );
      if (res.status === 204)
        setCart((prev) => {
          const filteredItems = prev.items.filter((item) => item.id !== id);
          return { ...prev, items: filteredItems };
        });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
      }
      console.log(error.message);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${item.price}</Text>
        <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const calculateTotal = () => {
    // Calculate the total based on cart items' prices and quantities
    let total = 0;
    if (cart && cart.items) {
      cart.items.forEach((item) => {
        total += item.price * item.quantity;
      });
    }
    return total.toFixed(2); // Round total to 2 decimal places
  };

  const removeAllFromCart = async () => {
    try {
      const res = await axios.delete(
        "http://192.168.1.3:3000/api/cart/deleteAll/2"
      );
      if (res.status === 204)
        setCart((prev) => {
          return { ...prev, items: [] };
        });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
      }
      console.log(error.message);
    }
  };

  const proceedToPayment = () => {
    // Logic to navigate to payment screen or execute payment process
    // Example: navigation.navigate('PaymentScreen');
  };
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View style={styles.cartHeader}>
        <Text style={styles.cartHeaderText}>Your Cart</Text>
        {cart && cart.items && cart.items.length > 0 && (
          <TouchableOpacity
            style={styles.removeAllButton}
            onPress={removeAllFromCart}
          >
            <Text style={styles.removeAllButtonText}>Remove All</Text>
          </TouchableOpacity>
        )}
      </View>

      {cart && cart.items && cart.items.length > 0 && (
        <>
          <FlatList
            data={cart.items}
            renderItem={renderItem}
            keyExtractor={(item) => `cart-${item.id}`}
          />

          <View style={styles.cartFooter}>
            <View style={styles.totalSection}>
              <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
              {/* Additional info */}
              <Text style={styles.additionalInfo}>
                Free Shipping on orders over $50
              </Text>
            </View>

            <TouchableOpacity
              style={styles.proceedButton}
              onPress={proceedToPayment}
            >
              <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {(!cart || !cart.items || cart.items.length === 0) && (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 14,
    color: "green",
    marginBottom: 5,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: "#777777",
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 10,
  },
  cartHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  removeAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "red",
    borderRadius: 5,
  },
  removeAllButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cartFooter: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingTop: 10,
  },
  totalSection: {
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  additionalInfo: {
    fontSize: 14,
    color: "#777777",
  },
  proceedButton: {
    paddingVertical: 12,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#999999",
  },
});

export default Cart;
