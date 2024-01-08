import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import LandingPage from '../screens/LandingPage';
import TabNav from '../screens/TabNav';
import Notification from '../screens/Notifcation';
import Messages from '../screens/Messages';
import Cart from '../screens/Cart';
import JewelryDetails from '../screens/JewleryDetails';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import MainPage from '../screens/MainPage';

import Checkout from '../screens/Checkout';
import PaymentForm from "../screens/PaymentForm";
import ReceiptScreen from "../screens/ReceiptScreen";
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import ConfirmEmail from '../screens/ConfirmEmail';
import NewPassword from '../screens/NewPasswordScreen';
import VerifyResetCode from '../screens/VerifyResetCode';




const Stack = createStackNavigator();

function CheckoutNavigator() {
  return (
      <Stack.Navigator initialRouteName={"Checkout"} screenOptions={{headerShown:false}}>
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="PaymentForm" component={PaymentForm} />
        <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
      </Stack.Navigator>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={LandingPage} options={{headerShown:false}} />
        <Stack.Screen name="nav" component={TabNav} options={{headerShown:false}} />
        <Stack.Screen name="notification" component={Notification} />
        <Stack.Screen name="messages" component={Messages} />
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name="details" component={JewelryDetails} />

        <Stack.Group  screenOptions={{headerShown:false,presentation:'modal'}}>
        <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="email" component={ConfirmEmail} />
        <Stack.Screen name="code" component={VerifyResetCode} />
        <Stack.Screen name="pass" component={NewPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="CheckoutNavigator" component={CheckoutNavigator} />
        <Stack.Screen name="verify" component={VerificationCodeScreen} />
        <Stack.Screen name="reset" component={VerifyResetCode} />

        </Stack.Group>



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
