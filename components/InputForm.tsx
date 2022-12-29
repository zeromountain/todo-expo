import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Icon,
  IconButton,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from 'native-base';

import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AntDesign } from '@expo/vector-icons';

const InputForm = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={top + bottom + 10}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Input
            placeholder='할 일을 입력하세요.'
            borderColor='gray.300'
            fontSize='15px'
            _focus={{
              backgroundColor: 'white',
              borderColor: 'black',
            }}
            InputRightElement={
              <Pressable
                hitSlop={10}
                pressRetentionOffset={100}
                marginRight='5px'
                onPress={() => Alert.alert('추가추가')}>
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
