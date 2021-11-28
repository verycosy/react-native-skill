import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';
import {MyProfileStackParamList} from './MyProfileStack';

function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<MyProfileStackParamList>>();

  useEffect(() => {
    navigation.setOptions({title: user!.displayName});
  }, [navigation, user]);

  return <Profile userId={user!.id} />;
}

export default MyProfileScreen;
