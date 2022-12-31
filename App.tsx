import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';
import { Box, NativeBaseProvider, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { auth } from './firebase';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import store from './store';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.log('logout error: ', error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NativeBaseProvider>
          <SafeAreaView />
          <StatusBar />
          {/* content */}
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{ headerTitle: 'LOGIN', headerShown: true }}
              />
              <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                  headerTitle: 'HOME',
                  headerShown: true,
                  headerBackTitle: '',
                  headerBackVisible: false,
                  headerRight: () => (
                    <TouchableOpacity onPress={handleLogout}>
                      <Box bg='coolGray.300' padding='5px' borderRadius='xl'>
                        <Text fontWeight='extrabold'>로그아웃</Text>
                      </Box>
                    </TouchableOpacity>
                  ),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </QueryClientProvider>
  );
}
