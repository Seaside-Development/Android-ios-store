import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, ActivityIndicator, Platform, TouchableNativeFeedback} from 'react-native';
import {Button} from 'react-native-paper';

import CategoryItem from '../../components/card.component';
import HeaderButton from '../../UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Colors from "../../constants/Colors";

const URI =
    'https://reactstore-836e1-default-rtdb.firebaseio.com/Categories.json';

const CategoryOverviewScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(URI)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => alert(error))
            .finally(() => setLoading(false))
    }, []);

    const selectCategoryHandler = name => {
        navigation.navigate('ProductsOverview', {
            categoryName: name,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading ? <ActivityIndicator size="large" color="#00ff00"/>
                    :
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={itemData => (
                            <CategoryItem
                                image={itemData.item.imageURL}
                                name={itemData.item.name}
                                description={itemData.item.description}
                                linkURL={itemData.item.linkURL}
                                onSelect={() => {
                                    selectCategoryHandler(itemData.item.name);
                                }}>
                                <Button
                                    color={Colors.primary}
                                    onPress={() => {
                                        selectCategoryHandler(itemData.item.name);
                                    }}
                                >VIEW MORE</Button>
                                <Button
                                    style={styles.actions}
                                    color={Colors.primary}
                                    onPress={() => {
                                        navigation.navigate('ProductList', {
                                            categoryName: itemData.item.name,
                                        });
                                    }}
                                >TEST SCREEN</Button>
                            </CategoryItem>
                        )}
                    />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
},

})
CategoryOverviewScreen.navigationOptions = navData => {
    return {
        headerRight: () =>
            <HeaderButtons
                HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName='md-cart'
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                />
            </HeaderButtons>
    };
};

export default CategoryOverviewScreen;
