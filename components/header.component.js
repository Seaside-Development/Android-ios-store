import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItemsCount} from "../store/selectors/cart";
import Colors from "../constants/Colors";

export default function HeaderComponent({navigation}) {
  const {itemCount} = useSelector(createStructuredSelector
  ({
        itemCount: selectCartItemsCount,
      }
  ));
  const openMenu = () => {
    navigation.openDrawer()
  }

  return (
      <View style={styles.header}>
        <MaterialIcons
            size={35}
            name="menu"
            style={styles.icon}
            onPress={openMenu}
        />
        <View>
          <Text style={styles.headerText}>APP</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
    letterSpacing: 1,
    marginLeft: '54%',
  },
  icon: {
    position: 'absolute',
    left: 5,
  },
});
