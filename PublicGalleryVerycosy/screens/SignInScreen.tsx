import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignButtons from '../components/SignButtons';
import SignForm from '../components/SignForm';
import {RootStackParamList} from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

function SignInScreen({route}: Props) {
  const {isSignUp} = route.params || {};
  const [form, setForm] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

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
          <SignForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons isSignUp={isSignUp} onSubmit={onSubmit} />
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
});

export default SignInScreen;
