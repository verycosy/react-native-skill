import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Todo} from '../App';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
}

function TodoList({todos, onToggle}: Props) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
      data={todos}
      renderItem={({item}) => <TodoItem {...item} onToggle={onToggle} />}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});

export default TodoList;
