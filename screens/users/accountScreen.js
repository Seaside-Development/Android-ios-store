import React from "react";
import LottieView from "lottie-react-native";

import {
    AccountContainer,
    AccountCover,
    AuthButton,
    Title,
    AnimationWrapper,
} from "./account.styles";
import {SafeAreaView, View} from "react-native";

export const AccountScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <AccountCover />
            <AnimationWrapper>
            </AnimationWrapper>
            <Title>Meals To Go</Title>
            <AccountContainer>
                <AuthButton
                    icon="lock-open-outline"
                    mode="contained"
                    onPress={() => navigation.navigate("Login")}
                >
                    Login
                </AuthButton>
                <View size="large">
                    <AuthButton
                        icon="email"
                        mode="contained"
                        onPress={() => navigation.navigate("Register")}
                    >
                        Register
                    </AuthButton>
                </View>
            </AccountContainer>
        </SafeAreaView>
    );
};
