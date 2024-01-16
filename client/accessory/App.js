// App.js
import  React from 'react';
import AppNavigation from './routes/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import {persistor, store} from './store';
import Toast from 'react-native-toast-message';
import {PersistGate} from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppNavigation/>
          <Toast/>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
