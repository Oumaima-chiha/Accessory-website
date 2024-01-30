import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "../services/axiosInterceptor";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigation,useNavigation } from '@react-navigation/native';


const Cart = () => {
  const user = useContext(useContext);
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const fetchAllCartItems = async () => {
    console.log(user);
    try {
      const { data } = await axios.get( "/cart/my-cart");
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
        "cart/delete/" + id
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
        <Text style={styles.cartItemPrice}>{item.price} TND</Text>
        <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={()=>decrementQuantity(item.id)}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.smallCartItemQuantity}>Quantity: {item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={()=>incrementQuantity(item.id)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          </View>
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
       "/cart/deleteAll"
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
   navigation.navigate("CheckoutNavigator")
  };
  const handleGoBack = () => {
    // Implement logic to navigate back to shopping or any other appropriate action
    console.log('Go back to shopping');
    navigation.navigate("home")
  };
  const incrementQuantity = async (id) => {
    try {
      const res = await axios.patch(
          process.env.EXPO_PUBLIC_API_URL+"cart/productInc/"+id
      );
      if (res.status===201)
      {

        setCart((prev) => {
          const index=prev.items.findIndex(x => x.id === id);
          let newArr=prev.items;
          newArr[index]=res.data
          return { ...prev, items:newArr };
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
      }
      console.log(error.message);
    }
  };

  const decrementQuantity = async (id) => {
    try {
      const res = await axios.patch(
         "cart/productdec/"+id
      );
      if (res.status === 204)
        setCart((prev) => {
          const filteredItems = prev.items.filter((item) => item.id !== id);
          return { ...prev, items: filteredItems };
        });
      if (res.status===201)
      {

        setCart((prev) => {
          const index=prev.items.findIndex(x => x.id === id);
          let newArr=prev.items;
          newArr[index]=res.data
          return { ...prev, items:newArr };
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
      }
      console.log(error.message);
    }
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
           <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
          <Text style={styles.goBackButtonText}>Go Back to Shopping</Text>
        </TouchableOpacity>

          <View style={styles.cartFooter}>
            <View style={styles.totalSection}>
              <Text style={styles.totalText}>Total: {calculateTotal()}TND</Text>
              {/* Additional info */}
              <Text style={styles.additionalInfo}>
                Free Shipping on orders over 50 TND
              </Text>
            </View>

            <TouchableOpacity
              style={styles.proceedButton}
              onPress={proceedToPayment}
            >
              <Text style={styles.proceedButtonText}>Proceed to Payment 🛍️</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {(!cart || !cart.items || cart.items.length === 0) && (
        <Text style={styles.emptyCartText}>Your cart is empty.🛒</Text>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "brown",
  },
  deleteButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  cartHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  removeAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "brown",
  },
  removeAllButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  cartFooter: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  totalSection: {
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  additionalInfo: {
    fontSize: 14,
    color: '#777',
  },
  proceedButton: {
    paddingVertical: 12,
    backgroundColor: 'brown',
    borderRadius: 5,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
  goBackButton: {
    backgroundColor: '#ddd',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  goBackButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    borderRadius: 50,
  
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "brown",
    
    padding: 3,
    marginLeft: 'auto', // Push to the right (center horizontally)
    marginRight: 'auto', // Push to the left (center horizontally)
  },
  quantityButton: {

    padding: 5,
   
  },
  quantityButtonText: {
    fontSize: 14,
    color: 'black',
  },
  smallCartItemQuantity: {
    fontSize: 12,
    marginLeft: 5,
    marginRight: 5,
    color: 'black',
  },
});




export default Cart;
