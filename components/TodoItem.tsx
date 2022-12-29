import { Alert, StyleSheet } from 'react-native';
import { HStack, Pressable, Text, View } from 'native-base';
import React from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppDispatch } from '../store/hoook';
import { toggleTodo } from '../store/todos/todoSlice';

type TodoType = {
  id: number;
  text: string;
  done: boolean;
};

interface TodoItemProps {
  todo: TodoType;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  console.log('TodoItem', todo);
  const dispatch = useAppDispatch();

  const handleToggleTodo = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleRemoveTodo = () => {
    Alert.alert(`${todo.id}번 할 일 삭제`);
  };
  return (
    <View flex='1' flexDirection='row' justifyContent='space-between'>
      <HStack space='10px'>
        <Pressable hitSlop={10} onPress={handleToggleTodo}>
          <AntDesign
            name={todo.done ? 'checkcircle' : 'checkcircleo'}
            size={24}
            color='black'
          />
        </Pressable>
        <Text
          fontSize='16px'
          textDecorationLine={todo.done ? 'line-through' : 'none'}>
          {todo.text}
        </Text>
      </HStack>
      <Pressable hitSlop={10} onPress={handleRemoveTodo}>
        <Ionicons
          name='remove-circle'
          size={24}
          color='red'
          style={styles.deleteDone}
        />
      </Pressable>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  deleteDone: {
    opacity: 0.3,
  },
});
