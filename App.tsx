import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView />
      <StatusBar />
      {/* content */}
      <HomeScreen />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
