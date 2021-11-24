import React, {ReactElement} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {Log} from '../contexts/LogContext';
import FeedListItem from './FeedListItem';

interface Props {
  logs: Log[];
  onScrolledToBottom?: (isBottom: boolean) => void;
  ListHeaderComponent?: ReactElement;
}

function FeedList({logs, onScrolledToBottom, ListHeaderComponent}: Props) {
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!onScrolledToBottom) {
      return;
    }

    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (
      contentSize.height > layoutMeasurement.height &&
      distanceFromBottom < 72
    ) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={distanceFromEnd => {
        console.log('바닥과 가까워짐', distanceFromEnd);
      }}
      onEndReachedThreshold={0.85}
      onScroll={onScroll}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default FeedList;
