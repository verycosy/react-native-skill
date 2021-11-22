import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import DateHead from './components/DateHead';

const App = () => {
  const today = new Date();

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#26a69a" />
      <DateHead date={today} />
    </SafeAreaView>
  );
};

export default App;
