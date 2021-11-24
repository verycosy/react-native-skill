import React from 'react';
import {View, Pressable, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  name: string;
  color: string;
  onPress: () => void;
  hasMarginRight?: boolean;
}

function TransparentCircleButton({
  name,
  color,
  onPress,
  hasMarginRight,
}: Props) {
  return (
    <View
      style={[styles.iconButtonWrapper, hasMarginRight && styles.rightMargin]}>
      <Pressable
        style={({pressed}) => [
          styles.iconButton,
          Platform.OS === 'ios' && pressed && {backgroundColor: '#efefef'},
        ]}
        android_ripple={{color: '#ededed'}}
        onPress={onPress}>
        <Icon name={name} size={24} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightMargin: {
    marginRight: 8,
  },
});

export default TransparentCircleButton;
