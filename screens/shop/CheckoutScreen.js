import React, { useContext, useEffect, useState } from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {CreditCardInput} from "../../components/credit-card.component";
import {useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartTotal} from "../../store/selectors/cart";
import {Button} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';

const CheckoutScreen = ({navigation} ) => {
    const [name, setName] = useState("")
    const {total} = useSelector(createStructuredSelector
    ({
        cartItems: selectCartItems,
        total: selectCartTotal
        }
    ));
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.space}>
                <Text>YOUR TOTAL: ${total}</Text>
                <TextInput
                    style={styles.input}
                    label='Name'
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={(t) => {setName(t)}}
                />
                {name.length > 0 && <CreditCardInput name={name}/>}
            </View>

            <Button
                icon='credit-card'>
                Pay Now
            </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    space: {
        flexDirection:'column',
        alignItems: 'center',
    },
    image: {
      height: 10,
      width: 10
    },
    input: {
        margin: 5,
        height: 60,
        width: '100%',
        backgroundColor: '#ffffff'
    }
})
export default CheckoutScreen
