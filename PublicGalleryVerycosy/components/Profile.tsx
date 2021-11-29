import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import usePosts from '../hooks/usePosts';
import events from '../lib/events';
import {Post} from '../lib/posts';
import {getUser, User} from '../lib/users';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';

interface Props {
  userId: string;
}

function Profile({userId}: Props) {
  const [user, setUser] = useState<User>();
  const {posts, noMorePost, refreshing, onRefresh, onLoadMore} =
    usePosts(userId);
  const {user: me} = useUserContext();
  const isMyProfile = me!.id === userId;

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  useEffect(() => {
    if (!isMyProfile) {
      return;
    }

    events.addListener('refresh', onRefresh);
    return () => {
      events.removeListener('refresh', onRefresh);
    };
  }, [isMyProfile, onRefresh]);

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      data={posts}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar
            source={user.photoURL ? {uri: user.photoURL} : undefined}
            size={128}
          />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.25}
      ListFooterComponent={
        !noMorePost ? (
          <ActivityIndicator
            style={styles.bottomSpinner}
            size={32}
            color="#6200ee"
          />
        ) : null
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

const renderItem = ({item}: {item: Post}) => <PostGridItem post={item} />;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  block: {
    flex: 1,
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  username: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
  bottomSpinner: {
    height: 128,
  },
});

export default Profile;
