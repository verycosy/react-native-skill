import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import PostCard from '../components/PostCard';
import {getPosts, Post} from '../lib/posts';

function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

const renderItem = ({item}: {item: Post}) => <PostCard {...item} />;

export default FeedScreen;
