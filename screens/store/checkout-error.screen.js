import React from "react";

import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";
import {Icon} from "react-native-elements";

export const CheckoutErrorScreen = ({ route }) => {
    const { error = "" } = route.params;
    return (
        <SafeAreaView>
            <View
                style={styles.CartIconContainer}>
                <View style={styles.CartIcon}>
                    <Icon
                        size={128}
                        name="exclamation-triangle"
                        type='font-awesome'
                        bg={Colors.primary}
                    />
                </View>
                <Text variant="label">{error}</Text>
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
