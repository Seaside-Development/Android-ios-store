import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {CreditCardInput} from "../../components/credit-card.component";
import {useDispatch, useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartTotal} from "../../store/selectors/cart";
import {Button, ActivityIndicator} from 'react-native-paper';
import {payRequest} from "../../services/checkout.service";
import * as cartActions from "../../store/action/cart";

const CheckoutScreen = ({navigation} ) => {
    const [name, setName] = useState("")
    const [card, setCard] = useState(null)
    const [isloading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const {total, cartItems} = useSelector(createStructuredSelector
    ({
        cartItems: selectCartItems,
        total: selectCartTotal
        }
    ));

    const onPay = () => {
        setIsLoading(true);
        if(!card || !card.id) {
            setIsLoading(false)
            navigation.navigate('CheckoutError',
                {
                    error: "Please fill in valid credit card"
                });
            return;
        }
        payRequest(card.id, total,  name)
            .then((result) => {
                setIsLoading(false)
                dispatch(cartActions.clearCart(cartItems))
                navigation.navigate('CheckoutSuccess')
            })
            .catch((error) => {
                setIsLoading(false)
                // dispatch(cartActions.clearCart(cartItems))
                navigation.navigate('CheckoutError',
                    {
                        error: error,
                    })
            })
    };

    return (
        <SafeAreaView style={styles.container}>
            {isloading &&
                <View style={styles.payment}>
                    <ActivityIndicator
                        color='purple'
                        size={128}
                    />
                </View>
            }
            <View style={styles.space}>
                <Text>YOUR TOTAL: ${total}</Text>
                <TextInput
                    style={styles.input}
                    label="Name"
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={(t) => {setName(t)}}
                />
                {name.length > 0 &&
                <CreditCardInput
                    name={name}
                    onSuccess={setCard}
                    onError={() =>
                        navigation.navigate('CheckoutError', {
                            error: 'Something went wrong processing payment'
                        })
                    }
                />}
            </View>

            <View style={styles.button}>
                <Button
                    disabled={isloading}
                    icon='credit-card'
                    mode='contained'
                    onPress={onPay}
                >
                    PAY
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    payment: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: 400,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        padding: 15,
    },
    space: {
        alignItems: 'center',
    },
    image: {
      height: 10,
      width: 10
    },
    button: {
        marginTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },
    input: {
        margin: 5,
        height: 60,
        width: '100%',
        backgroundColor: '#ffffff'
    }
})
export default CheckoutScreen
