import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Box, HStack, Input, Pressable, Text, View } from 'native-base';
import React, { useRef, useState } from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';

import { useAppDispatch } from '../store/hoook';
import { deleteTodo, toggleTodo, updateTodo } from '../store/todos/todoSlice';

type TodoType = {
  id: number;
  text: string;
  done: boolean;
};

interface TodoItemProps {
  todo: TodoType;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const inputRef = useRef<TextInput>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textRef = useRef<string>('');
  const dispatch = useAppDispatch();

  const handleChangeEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleUpdateTodo = () => {
    if (!textRef.current.trim()) {
      Alert.alert('수정 할 내용을 입력하세요.');
      return;
    }
    dispatch(
      updateTodo({
        id: todo.id,
        text: textRef.current,
      })
    );
    textRef.current = '';
    inputRef.current?.clear();
    setIsEditing(false);
  };

  const handleToggleTodo = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleRemoveTodo = () => {
    dispatch(deleteTodo(todo.id));
  };
  return (
    <>
      {isEditing ? (
        <HStack space='10px' alignItems='center'>
          <Input
            flex='1'
            _focus={{
              backgroundColor: 'white',
              borderColor: 'black',
            }}
            ref={inputRef}
            defaultValue={todo.text}
            onChangeText={(text) => (textRef.current = text)}
          />
          <TouchableOpacity onPress={handleUpdateTodo}>
            <Box backgroundColor='primary.500' padding='10px' borderRadius='xl'>
              <Text style={styles.buttonText}>수정</Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangeEditing}>
            <Box backgroundColor='red.500' padding='10px' borderRadius='xl'>
              <Text style={styles.buttonText}>취소</Text>
            </Box>
          </TouchableOpacity>
        </HStack>
      ) : (
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
          <HStack space='20px'>
            <Pressable hitSlop={10} onPress={handleChangeEditing}>
              <Feather name='edit' size={24} color='black' />
            </Pressable>
            <Pressable hitSlop={10} onPress={handleRemoveTodo}>
              <Ionicons
                name='remove-circle'
                size={24}
                color='red'
                style={todo.done && styles.deleteDone}
              />
            </Pressable>
          </HStack>
        </View>
      )}
    </>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  deleteDone: {
    opacity: 0.3,
  },
  editButton: {
    flex: 1,
    width: 50,
    height: 40,
    backgroundColor: 'primary.500',
  },
  cancelButton: {
    flex: 1,
    width: 50,
    height: 40,
    backgroundColor: 'red.500',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
