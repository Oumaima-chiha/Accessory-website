// App.js
import  React from 'react';
import AppNavigation from './routes/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
    <AppNavigation/>
    </SafeAreaProvider>
    </Provider>
  );
}

export default App;
