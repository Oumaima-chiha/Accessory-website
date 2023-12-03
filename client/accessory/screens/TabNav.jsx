import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../contants";
import { SafeAreaView, StyleSheet } from "react-native";
import HomePage from "./HomePage";
import Notification from "./Notifcation";
import Cart from "./Cart";
import Messages from "./Messages";
import { createStackNavigator } from "@react-navigation/stack";
import JewelryDetails from "./JewleryDetails";

const Tab = createBottomTabNavigator();
const HomeNav=createStackNavigator()
const HomeNavigator=()=>(
  <HomeNav.Navigator initialRouteName="home" >
       <HomeNav.Screen name="home" component={HomePage} />
      <HomeNav.Screen name="details" component={JewelryDetails} />
  </HomeNav.Navigator>
)

const TabNav = () => {
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
        name="notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="notification" size={24}  color={focused ? Colors.DEFAULT_RED : "black"}/>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="messages"
        component={Messages}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="message1" size={24}  color={focused ? Colors.DEFAULT_RED : "black"} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="shoppingcart" size={24}  color={focused ? Colors.DEFAULT_RED : "black"}/>
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
