import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from '../screens/LandingPage';
import HomePage from '../screens/HomePage';
import TabNav from '../screens/TabNav';
import Notification from '../screens/Notifcation';
import Messages from '../screens/Messages';
import Cart from '../screens/Cart';
import JewelryBox from '../screens/JewleryBox';


const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LandingPage} />
        <Stack.Screen name="home" component={HomePage} />
        <Stack.Screen name="nav" component={TabNav} />
        <Stack.Screen name="notification" component={Notification} />
        <Stack.Screen name="messages" component={Messages} />
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name="Jewlery" component={JewelryBox} />
  
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
