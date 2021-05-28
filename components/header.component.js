import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {MaterialIcons} from '@expo/vector-icons';

export default function HeaderComponent({navigation}) {
  const openMenu = () => {
    Animated.interpolate(navigation.openDrawer());
  };
  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
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
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
});
