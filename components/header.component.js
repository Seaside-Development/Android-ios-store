import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {MaterialIcons} from '@expo/vector-icons';

export default function HeaderComponent() {
  return (
    <View style={styles.header}>
      <Image
          source={require('../assets/headerIcon.png')}
          name="icon"
          size={28}
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
    marginLeft: '54%',
  },
  icon: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: 16,
  },
});
