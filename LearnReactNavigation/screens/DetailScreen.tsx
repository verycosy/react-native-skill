import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

function DetailScreen({route, navigation}: Props) {
  useEffect(() => {
    navigation.setOptions({
      title: `상세 정보 - ${route.params.id}`,
    });
  }, [navigation, route.params.id]);

  return (
    <View style={styles.block}>
      <Text style={styles.text}>id: {route.params.id}</Text>
      <Button
        title="다음"
        onPress={() => navigation.push('Detail', {id: route.params.id + 1})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
  },
});

export default DetailScreen;
