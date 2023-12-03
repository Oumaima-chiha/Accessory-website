// App.js
import  React from 'react';
import AppNavigation from './routes/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
    <AppNavigation/>
    </SafeAreaProvider>
  );
}

export default App;
