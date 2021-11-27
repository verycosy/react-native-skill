import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MyProfileScreen from './MyProfileScreen';

type MyProfileStackParamList = {
  MyProfile: undefined;
};

const Stack = createNativeStackNavigator<MyProfileStackParamList>();

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
    </Stack.Navigator>
  );
}

export default MyProfileStack;
