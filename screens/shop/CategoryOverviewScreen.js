import React from 'react';
import {Button, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import CategoryItem from '../../components/card.component';
import HeaderButton from '../../UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Colors from "../../constants/Colors";

const CategoryOverviewScreen = ({navigation}) => {
  const categories = useSelector(state => state.categories.availableProducts);
  // const catFilter = categories.filter(item => item.name === 'womens');

  const selectCategoryHandler = name => {
    navigation.navigate('ProductsOverview', {
      categoryName: name,
    });
  };
  return (
    <FlatList
      data={categories}
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
  );
};

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
