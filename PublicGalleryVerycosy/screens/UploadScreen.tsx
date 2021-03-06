import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import {v4} from 'uuid';
import IconRightButton from '../components/IconRightButton';
import {useUserContext} from '../contexts/UserContext';
import {RootStackParamList} from './RootStack';
import {createPost} from '../lib/posts';
import events from '../lib/events';

function UploadScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Upload'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Upload'>>();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [description, setDescription] = useState('');
  const {user} = useUserContext();

  const onSubmit = useCallback(async () => {
    navigation.pop();
    const asset = res!.assets![0];

    const extension = asset!.fileName!.split('.').pop();
    const reference = storage().ref(`/photo/${user!.id}/${v4()}.${extension}`);

    if (Platform.OS === 'android') {
      await reference.putString(asset.base64!, 'base64', {
        contentType: asset?.type,
      });
    } else {
      await reference.putFile(asset.uri!);
    }

    const photoURL = await reference.getDownloadURL();
    await createPost({description, photoURL, user: user!});

    events.emit('refresh');
  }, [res, user, description, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );

    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({ios: 180})}>
      <Animated.Image
        source={{uri: res?.assets?.[0]?.uri}}
        style={[styles.image, {height: animation}]}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="??? ????????? ?????? ????????? ???????????????..."
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  image: {width: '100%'},
  input: {
    padding: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default UploadScreen;
