import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../screens/RootStack';
import TransparentCircleButton from './TransparentCircleButton';

interface Props {
  onSave: () => void;
}

function WriteHeader({onSave}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Write'>>();

  const onGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.block}>
      <TransparentCircleButton
        onPress={onGoBack}
        name="arrow-back"
        color="#424242"
      />
      <View style={styles.buttons}>
        <TransparentCircleButton
          name="delete-forever"
          color="#ef5350"
          onPress={() => {}}
          hasMarginRight
        />
        <TransparentCircleButton
          name="check"
          color="#009688"
          onPress={onSave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
});

export default WriteHeader;
