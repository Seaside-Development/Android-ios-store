import React from 'react'
import {
    createStackNavigator,
} from "react-navigation-stack";
import CheckoutScreen from '../screens/shop/CheckoutScreen'
import {CheckoutSuccessScreen} from "../screens/store/checkout-success.screen";
import {CheckoutErrorScreen} from "../screens/store/checkout-error.screen";

const screen = {
    CheckoutScreen: {
        screen: CheckoutScreen,
    },
    CheckoutSuccessScreen: {
        screen: CheckoutSuccessScreen,
    },
    CheckoutErrorScreen: {
        screen: CheckoutErrorScreen,
    }
}

const CheckoutNavigator = createStackNavigator(screen, {
    headerMode: "none",
})

export default CheckoutNavigator;
