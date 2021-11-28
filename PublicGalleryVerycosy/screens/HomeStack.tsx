import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Post} from '../lib/posts';
import FeedScreen from './FeedScreen';
import PostScreen from './PostScreen';
import ProfileScreen from './ProfileScreen';

export type HomeStackParamList = {
  Feed: undefined;
  Profile: {
    userId: string;
    displayName: string;
  };
  Post: {
    post: Post;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{title: '게시물'}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
