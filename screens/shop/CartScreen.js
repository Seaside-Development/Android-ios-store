import React, {useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator, Image
} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartTotal} from "../../store/selectors/cart";

import Colors from "../../constants/Colors";
import CartItem from "../../components/cart-item.component";
import Card from "../../UI/card";

import * as cartActions from '../../store/action/cart';
import * as Location from 'expo-location';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const {total, cartItems} = useSelector(createStructuredSelector
    ({
            cartItems: selectCartItems,
            total: selectCartTotal
    }
    ));
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(cartActions.updateCartInFirebase(cartItems));
        setIsLoading(false);
    };

    return (
        <View style={styles.screen}>
            <Card>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>
                        TOTAL: <Text style={styles.amount}>${total.toFixed(2)}</Text>
                    </Text>
                    {isLoading ? (
                        <ActivityIndicator size="small" color={Colors.primary} />
                    ) : (
                        <Button
                            disabled={cartItems.length === 0}
                            color={Colors.accent}
                            title='CHECK OUT'
                            onPress={async () => {props.navigation.navigate('Checkout', {total})}}
                        />
                    )}
                </View>
            </Card>
            <Card View style={styles.items}>
                <View>
                    {cartItems.length ? (
                        cartItems.map(cartItem => (
                            <CartItem
                                key={cartItem.id}
                                item={cartItem}
                                deletable
                                onRemove={() => {
                                    dispatch(cartActions.removeItem(cartItem));
                                }}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyCart}>
                            <Image
                                source={require('../../assets/emptycart.png')}
                                name="emptyCart"
                                style={styles.icon}
                            />
                            <Text>Your cart is empty!</Text>
                        </View>
                    )}
                </View>
            </Card>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        margin: 12
    },
    items: {
        color: 'black',
        marginTop: 20,
        padding: 5,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'OpenSansBold',
        fontSize: 18,
        color: 'black'
    },
    amount: {
        color: Colors.primary,
    },
    icon: {
        width: 50,
        height: 50,
    },
    emptyCart: {
        alignItems: 'center',
        textAlign: 'center'
    }
});

export default CartScreen;
