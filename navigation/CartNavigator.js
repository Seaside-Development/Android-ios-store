import React from 'react'
import {
    createStackNavigator,
} from "react-navigation-stack";
import CheckoutScreen from '../screens/shop/CheckoutScreen'
import {CheckoutSuccessScreen} from "../screens/store/checkout-success.screen";
import {CheckoutErrorScreen} from "../screens/store/checkout-error.screen";

const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => (
    <CheckoutStack.Navigator headerMode="none">
        <CheckoutStack.Screen name="Checkout" component={CheckoutScreen} />
        <CheckoutStack.Screen
            name="CheckoutSuccess"
            component={CheckoutSuccessScreen}
        />
        <CheckoutStack.Screen
            name="CheckoutError"
            component={CheckoutErrorScreen}
        />
    </CheckoutStack.Navigator>
);
