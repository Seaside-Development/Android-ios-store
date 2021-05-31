import React from 'react';
import { View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as cartActions from '../store/action/cart';
import {useDispatch} from "react-redux";

const CartItem = ({deletable, onRemove, item: {price, name, quantity}}) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity} </Text>
                <Text style={styles.mainText}>{name}</Text>
                <Text style={styles.price}>{'  '}${price}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>total: ${quantity * price}</Text>
                {deletable && (
                    <TouchableOpacity
                        onPress={onRemove}
                        style={styles.deleteButton}
                    >
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                            size={23}
                            color="red"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        overflow: 'hidden'
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'OpenSansRegular',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'OpenSansBold',
        fontSize: 16
    },
    price: {
        fontFamily: 'OpenSansRegular',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default React.memo(CartItem);
