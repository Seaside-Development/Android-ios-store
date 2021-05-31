import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator
} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/selectors/cart";
import Colors from "../../constants/Colors";
import {createStructuredSelector} from "reselect";
import CartItem from "../../components/cart-item.component";
import Card from "../../UI/card";
import * as cartActions from '../../store/action/cart';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const {total, cartItems} = useSelector(createStructuredSelector
    ({
            cartItems: selectCartItems,
            total: selectCartTotal
    }
    ));
    const dispatch = useDispatch();

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
                            title='CHECK OUT' onPress={() => {}} />
                    )}
                </View>
            </Card>
            <View style={styles.items}>
                 <Text>Cart Items:</Text>
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
                    <Text>Your cart is empty</Text>
                )}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    items: {
        color: 'black',
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
    }
});

export default CartScreen;
