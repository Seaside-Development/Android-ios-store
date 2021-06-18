import React from "react";
import { Icon } from 'react-native-elements'
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";

export const CheckoutSuccessScreen  = ({ route }) => {
    return (
        <SafeAreaView>
            <View
                style={styles.CartIconContainer}>
                <View style={styles.CartIcon}>
                    <Icon
                        size={128}
                        name="check"
                        type='font-awesome'
                        bg={Colors.primary}
                    />
                </View>
                <Text variant="label">Success!</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    CartIcon: {
        height: 50,
        width: 50,
    },
    CartIconContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    }
})
