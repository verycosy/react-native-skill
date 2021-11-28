import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Profile from '../components/Profile';
import {HomeStackParamList} from './HomeStack';

function ProfileScreen() {
  const route = useRoute<RouteProp<HomeStackParamList, 'Profile'>>();
  const naviagtion =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const {userId, displayName} = route.params ?? {};

  useEffect(() => {
    naviagtion.setOptions({
      title: displayName,
    });
  }, [naviagtion, displayName]);

  return <Profile userId={userId} />;
}

export default ProfileScreen;
