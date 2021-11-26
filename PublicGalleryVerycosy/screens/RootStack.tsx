import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import MainTab from './MainTab';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';

export type RootStackParamList = {
  MainTab: undefined;
  SignIn: {
    isSignUp: boolean;
  };
  Welcome: {
    uid: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  const {user} = useUserContext();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
