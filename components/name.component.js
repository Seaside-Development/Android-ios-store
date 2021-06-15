import React from "react";
import {SafeAreaView, TextInput, StyleSheet} from "react-native";

const NameInput = () => {
    const [text, onChangeText] = React.useState(null)

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Enter Name"
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 15,
    },
    input: {
        height: 40,
        width: '70%',
        backgroundColor: '#ffffff'
    },
});

export default NameInput
