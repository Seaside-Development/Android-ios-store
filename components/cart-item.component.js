import React from 'react';
import { View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform
} from "react-native";
import { Ionicons } from '@expo/vector-icons';


const CartItem = ({item: {price, name, quantity}}) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity} </Text>
                <Text style={styles.mainText}>{name}</Text>
                <Text style={styles.price}>{'  '}${price}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>total: ${quantity * price.toFixed(2)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 5,
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
