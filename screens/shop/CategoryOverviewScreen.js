import React from 'react';
import {Button, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import CategoryItem from '../../components/card.component';
import HeaderButton from '../../UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

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
            title="VIEW MORE"
            onPress={() => {
              selectCategoryHandler(itemData.item.name);
            }}
          />
          <Button
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

export default CategoryOverviewScreen;
