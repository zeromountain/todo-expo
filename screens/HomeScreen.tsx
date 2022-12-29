import { Box, Divider, ScrollView, Text, View, VStack } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputForm from '../components/InputForm';
import TodoItem from '../components/TodoItem';

function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();

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
          <View paddingBottom='10px'>
            <Text>LIST</Text>
          </View>
          <ScrollView>
            <VStack space='30px'>
              <TodoItem />
              <TodoItem />
              <TodoItem />
              <TodoItem />
              <TodoItem />
              <TodoItem />
              <TodoItem />
              <TodoItem />
              <TodoItem />
            </VStack>
          </ScrollView>
        </Box>
        <Divider />
        <Box flex='1'>
          <View>
            <Text>COMPLETED</Text>
          </View>
        </Box>
      </VStack>
      <InputForm />
    </View>
  );
}

export default HomeScreen;
