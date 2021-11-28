import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {Post} from '../lib/posts';
import {HomeStackParamList} from '../screens/HomeStack';

interface Props {
  post: Post;
}

function PostGridItem({post}: Props) {
  const dimensions = useWindowDimensions();
  const size = (dimensions.width - 3) / 3;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const onPress = () => {
    navigation.navigate('Post', {post});
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {opacity: pressed ? 0.6 : 1, width: size, height: size},
        styles.block,
      ]}>
      <Image
        style={styles.image}
        source={{uri: post.photoURL}}
        resizeMode="cover"
        resizeMethod="resize"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {margin: 0.5},
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    height: '100%',
  },
});

export default PostGridItem;
