import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Log} from '../contexts/LogContext';
import MainTab from './MainTab';
import WriteScreen from './WriteScreen';

export type RootStackParamList = {
  MainTab: undefined;
  Write: {
    log?: Log;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
