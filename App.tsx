import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import store from './store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
              options={{ headerTitle: 'HOME', headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
