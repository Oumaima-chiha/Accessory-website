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
import Favorites from '../screens/Favorites';

import Checkout from '../screens/Checkout';
import PaymentForm from "../screens/PaymentForm";
import ReceiptScreen from "../screens/ReceiptScreen";
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import ConfirmEmail from '../screens/ConfirmEmail';
import NewPassword from '../screens/NewPasswordScreen';
import VerifyResetCode from '../screens/VerifyResetCode';
import Collections from '../screens/Collections';




const Stack = createStackNavigator();
const CollectionsNav=createStackNavigator()

function CheckoutNavigator() {
  return (
      <Stack.Navigator initialRouteName={"Checkout"} screenOptions={{headerShown:false}}>
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="PaymentForm" component={PaymentForm} />
        <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
      </Stack.Navigator>
  );
}
const CollectionsNavigator=()=>( 
  <CollectionsNav.Navigator initialRouteName="Collections" screenOptions={{headerShown:false}} >
       <CollectionsNav.Screen name="Collections" component={Collections} />
       <Stack.Group  screenOptions={{headerShown:false,presentation:'modal'}}>
      <CollectionsNav.Screen name="details" component={JewelryDetails} />
      </Stack.Group>
  </CollectionsNav.Navigator>
)

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={LandingPage} options={{headerShown:false}} />
        <Stack.Screen name="nav" component={TabNav} options={{headerShown:false}} />
        <Stack.Screen name="favorites" component={Favorites} />
        <Stack.Screen name="messages" component={Messages} />
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name="details" component={JewelryDetails} />
        <Stack.Screen name="CollectionsNav" component={CollectionsNavigator} />

        <Stack.Group  screenOptions={{headerShown:false,presentation:'modal'}}>
        <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="email" component={ConfirmEmail} />
        <Stack.Screen name="code" component={VerifyResetCode} />
        <Stack.Screen name="pass" component={NewPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
       
        <Stack.Screen name="CheckoutNavigator" component={CheckoutNavigator} />
        <Stack.Screen name="verify" component={VerificationCodeScreen} />
        <Stack.Screen name="reset" component={VerifyResetCode} />
      
        </Stack.Group>



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
