import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  name: string;
  color?: string;
  onPress: () => void;
}

function IconRightButton({name, color = '#6200ee', onPress}: Props) {
  return (
    <View style={styles.block}>
      <Pressable
        style={({pressed}) => [
          styles.circle,
          Platform.OS === 'ios' && pressed && {opacity: 0.3},
        ]}
        android_ripple={{color: '#eee'}}
        onPress={onPress}>
        <Icon name={name} color={color} size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginRight: -8,
    borderRadius: 24,
    overflow: 'hidden',
  },
  circle: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconRightButton;
