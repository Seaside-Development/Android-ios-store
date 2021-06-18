import React from 'react'
import {useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItemsCount} from "../store/selectors/cart";
import {Badge} from "react-native-paper";
import {Text, View, StyleSheet} from "react-native";
import Colors from "../constants/Colors";

const CartTotal = () => {
    const {total} = useSelector(createStructuredSelector
    ({
            total: selectCartItemsCount
        }
    ));

    return (
        <View style={styles.container}>
                <Text style={styles.headline}>{total}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    headline: {
        fontWeight: 'bold',
        marginTop: 0,
        width: 25,
        height: 25,
        textAlign: 'center',
        borderRadius: 150/2,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
});
export default CartTotal;
