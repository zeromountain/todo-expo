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

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.done),
    [todos]
  );

  return (
    <View
      flex='1'
      paddingTop={Platform.OS === 'ios' ? 0 : '20px'}
      paddingBottom={Platform.OS === 'ios' ? bottom : 0}
      paddingX='10px'>
      <VStack flex='1' space='10px'>
        <Text fontSize='26px' fontWeight='extrabold'>
          Todo
        </Text>
        <Box flex='1'>
          <View marginBottom='10px'>
            <Text>LIST</Text>
          </View>
          <FlatList
            data={todos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <TodoItem todo={item} />}
            ItemSeparatorComponent={() => <Box h='30px' />}
          />
        </Box>
        <Divider />
        <Box flex='1'>
          <View marginBottom='10px'>
            <Text>COMPLETED</Text>
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
