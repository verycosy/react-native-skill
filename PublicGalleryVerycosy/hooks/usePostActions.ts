import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {ActionSheetIOS, Platform} from 'react-native';
import events from '../lib/events';
import {removePost} from '../lib/posts';
import {HomeStackParamList} from '../screens/HomeStack';
import {RootStackParamList} from '../screens/RootStack';

interface Props {
  id: string;
  description: string;
}

export default function usePostActions({id, description}: Props) {
  const [isSelecting, setIsSelecting] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'Post' | 'Feed'>>();

  const edit = () => {
    navigation.navigate('Modify', {
      id,
      description,
    });
  };

  const remove = async () => {
    await removePost(id);

    if (route.name === 'Post') {
      navigation.pop();
    }

    events.emit('removePost', id);
  };

  const onPressMore = () => {
    if (Platform.OS === 'android') {
      setIsSelecting(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['설명 수정', '게시물 삭제', '취소'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            edit();
          } else if (buttonIndex === 1) {
            remove();
          }
        },
      );
    }
  };

  const actions = [
    {
      icon: 'edit',
      text: '설명 수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '게시물 삭제',
      onPress: remove,
    },
  ];

  const onClose = () => {
    setIsSelecting(false);
  };

  return {isSelecting, onPressMore, onClose, actions};
}
