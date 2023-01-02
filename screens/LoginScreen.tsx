import { Alert, Platform, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Input,
  KeyboardAvoidingView,
  Text,
  useToast,
  VStack,
} from 'native-base';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const LoginScreen = () => {
  const toast = useToast();
  const navigation = useNavigation<LoginNavigationProps>();
  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (!emailRef.current.trim() || !passwordRef.current.trim()) {
      Alert.alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        emailRef.current,
        passwordRef.current
      );

      toast.show({
        render: () => {
          return (
            <Flex
              alignItems='center'
              justifyContent='center'
              bg='emerald.500'
              px='2'
              py='1'
              rounded='sm'
              mb={5}>
              <Text color='white' fontSize='20px' fontWeight='bold'>
                로그인 성공
              </Text>
              <Text color='white'>{user.email}로 로그인 되었습니다.</Text>
            </Flex>
          );
        },
      });
    } catch (error: any) {
      console.log('login error', error.message);
      if (error.code.includes('auth/user-not-found')) {
        Alert.alert(
          '에러',
          '존재하지 않는 이메일 입니다.',
          [
            {
              text: '확인',
            },
          ],
          { cancelable: true }
        );
      }
    }
  };

  const handleSignUp = async () => {
    if (!emailRef.current.trim() || !passwordRef.current.trim()) {
      Alert.alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        emailRef.current,
        passwordRef.current
      );

      toast.show({
        render: () => {
          return (
            <Flex
              alignItems='center'
              justifyContent='center'
              bg='emerald.500'
              px='2'
              py='1'
              rounded='sm'
              mb={5}>
              <Text color='white' fontSize='20px' fontWeight='bold'>
                회원가입 성공
              </Text>
              <Text color='white'>{user.email}로 가입되었습니다.</Text>
            </Flex>
          );
        },
      });
    } catch (error: any) {
      console.log('signup error: ', error.code);
      if (error.code.includes('auth/email-already-in-use')) {
        Alert.alert(
          '에러',
          '이미 사용중인 이메일 입니다.',
          [
            {
              text: '확인',
            },
          ],
          {
            cancelable: true,
          }
        );
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView
      flex='1'
      paddingX='20px'
      justifyContent='center'
      backgroundColor='white'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      <VStack space='20px'>
        <Input
          autoComplete='off'
          autoCapitalize='none'
          placeholder='이메일을 입력하세요.'
          placeholderTextColor='gray.300'
          _focus={{
            backgroundColor: 'white',
            borderColor: 'black',
          }}
          ref={emailInputRef}
          onChangeText={(text) => (emailRef.current = text)}
        />
        <Input
          autoCapitalize='none'
          placeholder='비밀번호를 입력하세요.'
          placeholderTextColor='gray.300'
          _focus={{
            backgroundColor: 'white',
            borderColor: 'black',
          }}
          ref={passwordInputRef}
          onChangeText={(text) => (passwordRef.current = text)}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin}>
          <Box
            flexGrow='1'
            w='100%'
            justifyContent='center'
            alignItems='center'
            backgroundColor='black'
            borderRadius='10px'>
            <Text fontSize='xl' fontWeight='semibold' color='white'>
              로그인
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}>
          <Box
            flexGrow='1'
            w='100%'
            justifyContent='center'
            alignItems='center'
            borderWidth='1px'
            borderRadius='10px'>
            <Text fontSize='xl' fontWeight='semibold'>
              회원가입
            </Text>
          </Box>
        </TouchableOpacity>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
