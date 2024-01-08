// App.js
import  React from 'react';
import AppNavigation from './routes/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
    <AppNavigation/>
    <Toast/>
    </SafeAreaProvider>
    </Provider>
  );
}

export default App;
