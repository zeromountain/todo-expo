import { Alert, Platform, TextInput, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { Box, Input, KeyboardAvoidingView, Text, VStack } from 'native-base';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';

const LoginScreen = () => {
  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (!emailRef.current.trim() || !passwordRef.current.trim()) {
      Alert.alert('이메일과 비밀번호를 입력하세요.');
      return;
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
      console.log('user', user);
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
