import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import {HomeStackParamList} from './HomeStack';

function PostScreen() {
  const route = useRoute<RouteProp<HomeStackParamList, 'Post'>>();
  const {post} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard {...post} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40,
  },
});

export default PostScreen;
