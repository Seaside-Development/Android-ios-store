import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import {
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title,
} from "./account.styles";
import {useSelector, useDispatch} from "react-redux";
import {SafeAreaView, Text, View} from "react-native";
import * as userActions from '../../store/action/user';
import {googleSignInStart, emailSignInStart} from "../../store/action/user";
import {isLoading} from "expo-font";

export const LoginScreen = ({ navigation, googleSignInStart, emailSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState(
        {email: '', password: ''});

    const {email, password} = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault(); //stop page from reloading
        emailSignInStart(email, password);
        //grab the information on submit has be clicked
    }
    const handleChange = event => {
        const { value, name} = event.target;

        setUserCredentials({...userCredentials, [name]: value})
    }

    const dispatch = useDispatch();
    dispatch(emailSignInStart({email, password}))
    return (
        <SafeAreaView>
            <AccountCover />
            <Title>Meals To Go</Title>
            <AccountContainer onSubmit={handleSubmit}>
                <AuthInput
                    label="E-mail"
                    value={email}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    handleChange={handleChange}
                />
                <View size="large">
                    <AuthInput
                        label="Password"
                        value={password}
                        textContentType="password"
                        secureTextEntry
                        autoCapitalize="none"
                        handleChange={handleChange}
                    />
                </View>
                {error && (
                    <ErrorContainer size="large">
                        <Text variant="error">{error}</Text>
                    </ErrorContainer>
                )}
                <View size="large">
                    {!isLoading ? (
                        <AuthButton
                            icon="lock-open-outline"
                            mode="contained"
                            onPress={dispatch(userActions.googleSignInStart())}
                        >
                            Login
                        </AuthButton>
                    ) : (
                        <ActivityIndicator animating={true} color={Colors.blue300} />
                    )}
                </View>
            </AccountContainer>
            <View size="large">
                <AuthButton mode="contained" onPress={() => navigation.goBack()}>
                    Back
                </AuthButton>
            </View>
        </SafeAreaView>
    );
};
