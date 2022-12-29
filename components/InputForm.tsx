import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input, KeyboardAvoidingView, Pressable, View } from 'native-base';

import React, { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AntDesign } from '@expo/vector-icons';
import { useAppDispatch } from '../store/hoook';
import { addTodo } from '../store/todos/todoSlice';

const InputForm = () => {
  const { top, bottom } = useSafeAreaInsets();
  const textRef = useRef<string>('');
  const inputRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (!textRef.current.trim()) {
      Alert.alert('할 일을 입력하세요.');
      return;
    }

    dispatch(addTodo(textRef.current));

    textRef.current = '';
    inputRef.current?.clear();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={top + bottom + 50}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Input
            ref={inputRef}
            placeholder='할 일을 입력하세요.'
            borderColor='gray.300'
            fontSize='15px'
            _focus={{
              backgroundColor: 'white',
              borderColor: 'black',
            }}
            onChangeText={(text) => (textRef.current = text)}
            InputRightElement={
              <Pressable
                hitSlop={10}
                pressRetentionOffset={100}
                marginRight='5px'
                onPress={handleSubmit}>
                <AntDesign name='pluscircle' size={24} color='black' />
              </Pressable>
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputForm;

const styles = StyleSheet.create({});
