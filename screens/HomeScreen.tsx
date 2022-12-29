import { Box, Divider, FlatList, Text, View, VStack } from 'native-base';
import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputForm from '../components/InputForm';
import TodoItem from '../components/TodoItem';
import { useAppSelector } from '../store/hoook';

function HomeScreen() {
  const { bottom } = useSafeAreaInsets();

  const { todos } = useAppSelector((state) => state.TODO);

  const pendingTodos = useMemo(
    () => todos.filter((todo) => !todo.done),
    [todos]
  );

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.done),
    [todos]
  );

  return (
    <View
      flex='1'
      paddingTop={Platform.OS === 'ios' ? 0 : '20px'}
      paddingBottom={Platform.OS === 'ios' ? bottom : 0}
      paddingX='10px'
      backgroundColor='white'>
      <VStack flex='1' space='10px'>
        <Box flex='1'>
          <View marginBottom='10px'>
            <Text>해야 할 일 {pendingTodos.length}개</Text>
          </View>
          <FlatList
            data={pendingTodos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <TodoItem todo={item} />}
            ItemSeparatorComponent={() => <Box h='30px' />}
          />
        </Box>
        <Divider />
        <Box flex='1'>
          <View marginBottom='10px'>
            <Text>완료한 일 {completedTodos.length}개</Text>
          </View>
          <FlatList
            data={completedTodos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <TodoItem todo={item} />}
            ItemSeparatorComponent={() => <Box h='30px' />}
          />
        </Box>
      </VStack>
      <InputForm />
    </View>
  );
}

export default HomeScreen;
