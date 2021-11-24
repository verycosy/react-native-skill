import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Headerless'>;

function HeaderlessScreen({navigation}: Props) {
  return (
    <SafeAreaView>
      <View>
        <Text>Headerless</Text>
        <Button title="뒤로가기" onPress={() => navigation.pop()} />
      </View>
    </SafeAreaView>
  );
}

export default HeaderlessScreen;
