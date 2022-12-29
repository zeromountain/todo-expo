import { Alert, Platform, TextInput, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { Box, Input, KeyboardAvoidingView, Text, VStack } from 'native-base';

const LoginScreen = () => {
  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    if (!emailRef.current.trim() || !passwordRef.current.trim()) {
      Alert.alert('이메일과 비밀번호를 입력하세요.');
      return;
    }
  };

  const handleNavigateToSignUp = () => {
    // navigation.navigate('SignUp');
    Alert.alert('회원가입 페이지로 이동합니다.');
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
        <TouchableOpacity onPress={handleSubmit}>
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
        <TouchableOpacity onPress={handleNavigateToSignUp}>
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
