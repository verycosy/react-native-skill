import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogContextProvider} from './contexts/LogContext';
import RootStack from './screens/RootStack';

const App = () => {
  return (
    <NavigationContainer>
      <LogContextProvider>
        <RootStack />
      </LogContextProvider>
    </NavigationContainer>
  );
};

export default App;
