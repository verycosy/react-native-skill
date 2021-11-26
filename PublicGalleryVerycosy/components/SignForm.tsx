import React, {useRef} from 'react';
import {TextInput} from 'react-native';
import {SignUpForm} from '../screens/SignInScreen';
import BorderedInput from './BorderedInput';

interface Props {
  isSignUp: boolean;
  onSubmit: () => void;
  form: SignUpForm;
  createChangeTextHandler: (name: keyof SignUpForm) => (value: string) => void;
}

function SignForm({isSignUp, form, createChangeTextHandler, onSubmit}: Props) {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <>
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
    </>
  );
}

export default SignForm;
