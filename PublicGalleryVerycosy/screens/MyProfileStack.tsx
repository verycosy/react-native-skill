import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Post} from '../lib/posts';
import MyProfileScreen from './MyProfileScreen';
import PostScreen from './PostScreen';

export type MyProfileStackParamList = {
  MyProfile: undefined;
  Post: {
    post: Post;
  };
};

const Stack = createNativeStackNavigator<MyProfileStackParamList>();

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}

export default MyProfileStack;
