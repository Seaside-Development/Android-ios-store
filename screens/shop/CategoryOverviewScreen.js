import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import CategoryItem from '../../components/card.component';
import HeaderButton from '../../UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Colors from "../../constants/Colors";

const URI =
    'https://reactstore-836e1-default-rtdb.firebaseio.com/Categories.json';

const getData = async () => {
    try {
        const response  = await fetch(URI);
        const json = await response.json();
        return json;
    } catch (error) {
        alert(error);
    }
};

const CategoryOverviewScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    getData().then(data => setData(data));

    const selectCategoryHandler = name => {
        navigation.navigate('ProductsOverview', {
            categoryName: name,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
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
                            title="VIEW MORE"
                            onPress={() => {
                                selectCategoryHandler(itemData.item.name);
                            }}
                        />
                        <Button
                            style={styles.actions}
                            color={Colors.primary}
                            title="SEE LIST"
                            onPress={() => {
                                navigation.navigate('ProductList', {
                                    categoryName: itemData.item.name,
                                });
                            }}
                        />
                    </CategoryItem>
                )}
            />
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
