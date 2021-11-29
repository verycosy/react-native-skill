import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import events from '../lib/events';
import {HomeStackParamList} from './HomeStack';

function PostScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'Post'>>();
  const {post} = route.params;

  useEffect(() => {
    const handler = ({description}: {description: string}) => {
      navigation.setParams({post: {...post, description}});
    };

    events.addListener('updatePost', handler);
    return () => {
      events.removeListener('updatePost', handler);
    };
  }, [post, navigation]);

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
