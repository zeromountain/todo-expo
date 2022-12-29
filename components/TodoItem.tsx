import { Alert, StyleSheet } from 'react-native';
import { HStack, Pressable, Text, View } from 'native-base';
import React from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const TodoItem = () => {
  return (
    <View flex='1' flexDirection='row' justifyContent='space-between'>
      <HStack space='10px'>
        <Pressable hitSlop={10} onPress={() => Alert.alert('체크체크')}>
          <AntDesign name='checkcircleo' size={24} color='black' />
        </Pressable>
        <Text fontSize='16px'>코딩하기</Text>
      </HStack>
      <Pressable hitSlop={10} onPress={() => Alert.alert('삭제삭제')}>
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
