import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  name: string;
}

function Greeting({name = 'React Native'}: Props) {
  return (
    <>
      <View>
        <Text>Hello, {name}!</Text>
      </View>
      <Text>Extra</Text>
    </>
  );
}

export default Greeting;
