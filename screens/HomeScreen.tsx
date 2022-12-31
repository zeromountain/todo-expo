import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { onAuthStateChanged } from 'firebase/auth';
import {
  Box,
  Divider,
  FlatList,
  Flex,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import React, { useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import instance from '../apis/_axios/instance';
import { RootStackParamList } from '../App';
import InputForm from '../components/InputForm';
import TodoItem from '../components/TodoItem';
import { auth } from '../firebase';
import { useAppSelector } from '../store/hoook';

type HomeNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const toast = useToast();
  const navigation = useNavigation<HomeNavigationProps>();

  const { todos } = useAppSelector((state) => state.TODO);
  const { data } = useQuery<
    { completed: boolean; id: number; todo: string; userId: number }[]
  >({
    queryKey: ['GET_TODOS'],
    queryFn: async () => {
      const { data } = await instance.get('/todos');

      return data.todos;
    },
  });

  console.log('data:', data);

  const pendingTodos = useMemo(
    () => data?.filter((todo) => !todo.completed),
    [data]
  );

  const completedTodos = useMemo(
    () => data?.filter((todo) => todo.completed),
    [data]
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login');
        toast.show({
          render: () => {
            return (
              <Flex
                alignItems='center'
                justifyContent='center'
                bg='rose.500'
                px='2'
                py='1'
                rounded='sm'
                mb={5}>
                <Text color='white' fontSize='20px' fontWeight='bold'>
                  로그아웃 성공
                </Text>
              </Flex>
            );
          },
        });
      }
    });
  }, []);

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
            <Text>해야 할 일 {pendingTodos?.length}개</Text>
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
            <Text>완료한 일 {completedTodos?.length}개</Text>
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
