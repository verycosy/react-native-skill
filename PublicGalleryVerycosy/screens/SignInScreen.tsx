import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import {RootStackParamList} from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

function SignInScreen({navigation, route}: Props) {
  const {isSignUp} = route.params || {};
  const [form, setForm] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const createChangeTextHandler =
    (name: keyof SignUpForm) => (value: string) => {
      setForm({...form, [name]: value});
    };

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>Public Gallery</Text>
        <View style={styles.form}>
          <BorderedInput
            placeholder="이메일"
            value={form.email}
            onChangeText={createChangeTextHandler('email')}
            hasMarginBottom
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <BorderedInput
            placeholder="비밀번호"
            value={form.password}
            onChangeText={createChangeTextHandler('password')}
            hasMarginBottom
            secureTextEntry
            ref={passwordRef}
            returnKeyType={isSignUp ? 'next' : 'done'}
            onSubmitEditing={() => {
              if (isSignUp) {
                confirmPasswordRef.current?.focus();
              } else {
                onSubmit();
              }
            }}
          />
          {isSignUp && (
            <BorderedInput
              placeholder="비밀번호 확인"
              value={form.confirmPassword}
              onChangeText={createChangeTextHandler('confirmPassword')}
              secureTextEntry
              ref={confirmPasswordRef}
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />
          )}
          <View style={styles.buttons}>
            {isSignUp ? (
              <>
                <CustomButton
                  title="회원가입"
                  onPress={onSubmit}
                  theme="secondary"
                  hasMarginBottom
                />
                <CustomButton
                  title="로그인"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </>
            ) : (
              <>
                <CustomButton
                  title="로그인"
                  onPress={onSubmit}
                  hasMarginBottom
                />
                <CustomButton
                  title="회원가입"
                  onPress={() => {
                    navigation.push('SignIn', {isSignUp: true});
                  }}
                  theme="secondary"
                />
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 64,
  },
});

export default SignInScreen;
