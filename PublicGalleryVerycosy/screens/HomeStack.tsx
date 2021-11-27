import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FeedScreen from './FeedScreen';

type HomeStackParamList = {
  Feed: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
