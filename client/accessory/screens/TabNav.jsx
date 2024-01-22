import React, {useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../contants";
import { SafeAreaView, StyleSheet } from "react-native";
import HomePage from "./HomePage";

import Cart from "./Cart";

import { createStackNavigator } from "@react-navigation/stack";
import JewelryDetails from "./JewleryDetails";
import Login from "./Login";
import {navigation, useNavigation} from "@react-navigation/native";

import { MaterialIcons } from '@expo/vector-icons';
import Favorites from "./Favorites";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedInSelector} from "../store/user/selectors";
import {logout} from "../store/user";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();
const HomeNav=createStackNavigator()

const HomeNavigator=()=>(
  <HomeNav.Navigator initialRouteName="home" >
       <HomeNav.Screen name="home" component={HomePage} />
      <HomeNav.Screen name="details" component={JewelryDetails} />
  </HomeNav.Navigator>
)


const TabNav = ({navigation}) => {
    const dispatch=useDispatch()
    const isLoggedIn=useSelector(isLoggedInSelector)

    const listener = {
        tabPress: async (e) => {
           if(isLoggedIn) {
               await dispatch(logout())
               Toast.show({
                   type: 'success',
                   position: 'top',
                   text1: 'user logged out successfully!'
               })
           }
        },

    }
    const cartListener = {
        tabPress: async (e) => {
            if(!isLoggedIn) {
                e.preventDefault()
                navigation.navigate('login')
            }
        },

    }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}

    >
      <Tab.Screen
        name="homeNav"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? Colors.DEFAULT_RED : "black"}
              style={styles.Home}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="favorites"
        component={Favorites}
        options={{
            unmountOnBlur:true,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="favorite-border" size={24} color={focused ? Colors.DEFAULT_RED : "black"} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="cart"
        component={Cart}
        listeners={cartListener}
        options={{
          unmountOnBlur:true,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="shoppingcart" size={24}  color={focused ? Colors.DEFAULT_RED : "black"}/>
          ),
        }}
      ></Tab.Screen>
       <Tab.Screen
        name="login"
        component={Login}
        listeners={listener}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
           <AntDesign name={isLoggedIn?'logout':'login'} size={24} color={focused ? Colors.DEFAULT_RED : "black"} />
          ),
        }}
      ></Tab.Screen>


    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
  },
  Home: {
    fontSize: 24,
  },
});

export default TabNav;
