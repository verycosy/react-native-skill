import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ko from 'date-fns/locale/ko';
import format from 'date-fns/format';
import React, {useReducer} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../screens/RootStack';
import TransparentCircleButton from './TransparentCircleButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props {
  onSave: () => void;
  onAskRemove: () => void;
  isEditing: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
}

type Mode = 'date' | 'time' | 'datetime' | undefined;

interface State {
  mode: Mode;
  visible: boolean;
}

interface Action {
  type: 'open' | 'close';
  mode?: Mode;
}

const initialState: State = {mode: 'date', visible: false};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'open': {
      return {
        mode: action.mode,
        visible: true,
      };
    }

    case 'close': {
      return {
        ...state,
        visible: false,
      };
    }

    default:
      throw new Error('Unhandled action type');
  }
}

function WriteHeader({
  onSave,
  onAskRemove,
  isEditing,
  date,
  onChangeDate,
}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Write'>>();

  const onGoBack = () => {
    navigation.pop();
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const open = (mode: Mode) => dispatch({type: 'open', mode});
  const close = () => dispatch({type: 'close'});

  const onConfirm = (selectedDate: Date) => {
    close();
    onChangeDate(selectedDate);
  };

  return (
    <View style={styles.block}>
      <TransparentCircleButton
        onPress={onGoBack}
        name="arrow-back"
        color="#424242"
      />
      <View style={styles.buttons}>
        {isEditing && (
          <TransparentCircleButton
            name="delete-forever"
            color="#ef5350"
            onPress={onAskRemove}
            hasMarginRight
          />
        )}

        <TransparentCircleButton
          name="check"
          color="#009688"
          onPress={onSave}
        />
      </View>

      <View style={styles.center}>
        <Pressable onPress={() => open('date')}>
          <Text>
            {format(new Date(date), 'PPP', {
              locale: ko,
            })}
          </Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => open('time')}>
          <Text>{format(new Date(date), 'p', {locale: ko})}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={state.visible}
        mode={state.mode}
        onConfirm={onConfirm}
        onCancel={close}
        date={date}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});

export default WriteHeader;
