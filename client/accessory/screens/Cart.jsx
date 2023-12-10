import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View ,Text} from "react-native";

const Cart=()=>{
    const navigation = useNavigation();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
          e.preventDefault();
          navigation.navigate('LogIn');
        });
      
        return unsubscribe;
      }, [navigation]);
    return(
        <>
          <View>
            <Text>
            Cart
            </Text>
        </View></>
    )
}
export default Cart;