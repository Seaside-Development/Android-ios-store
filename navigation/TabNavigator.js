import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from "react-navigation";
import {MaterialIcons} from "@expo/vector-icons";

import CartScreen from "../screens/shop/CartScreen";
import ShopNavigator from './ShopNavigator'
import CheckoutNavigator from './CartNavigator'
import {Text, View} from "react-native";
import CartTotal from "../components/badge";

const drawerNavigator = createDrawerNavigator({
    HOME: {
        screen: ShopNavigator,
        navigationOptions: {
            drawerIcon: (
                <MaterialIcons
                    style={{ width: 24, height: 24 }}
                    size={25}
                    name="home"
                />
            ),
        },
    },
    CART: {
        screen: CartScreen,
        navigationOptions: {
            drawerLabel: (
                <View style={
                    {
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    <Text h5 style={{margin: 16, fontWeight: 'bold'}}>
                        CART
                    </Text>
                    <CartTotal/>
                </View>
            ),
            drawerIcon: (
                <MaterialIcons
                    style={{ width: 24, height: 24 }}
                    size={25}
                    name="shopping-bag"
                />
            ),
        },
    },
    CHECKOUT: {
        screen: CheckoutNavigator,
        navigationOptions: {
            drawerIcon: (
                <MaterialIcons
                    style={{ width: 24, height: 24 }}
                    size={25}
                    name="credit-card"
                />
            ),
        },
    }
});

export default createAppContainer(drawerNavigator);
