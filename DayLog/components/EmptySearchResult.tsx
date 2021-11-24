import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Message = 'NOT_FOUND' | 'EMPTY_KEYWORD';

const messages: {
  [key in Message]: string;
} = {
  NOT_FOUND: '검색 결과가 없습니다.',
  EMPTY_KEYWORD: '검색어를 입력하세요.',
};

interface Props {
  type: Message;
}

function EmptySearchResult({type}: Props) {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>{messages[type]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#9e9e9e',
    fontSize: 16,
  },
});

export default EmptySearchResult;
