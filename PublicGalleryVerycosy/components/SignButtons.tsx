import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../screens/RootStack';
import CustomButton from './CustomButton';

interface Props {
  isSignUp: boolean;
  onSubmit: () => void;
}

function SignButtons({isSignUp, onSubmit}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonPress = () => {
    if (isSignUp) {
      navigation.goBack();
    } else {
      navigation.push('SignIn', {isSignUp: true});
    }
  };

  return (
    <View style={styles.buttons}>
      <CustomButton title={primaryTitle} onPress={onSubmit} hasMarginBottom />
      <CustomButton
        title={secondaryTitle}
        theme="secondary"
        onPress={onSecondaryButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
});

export default SignButtons;
