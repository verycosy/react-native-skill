import {StyleSheet, View, ViewStyle} from 'react-native';

type SIZE = 'small' | 'medium' | 'large';

interface Props {
  rounded: boolean;
  size: SIZE;
  color: string;
}

function Box({rounded, size, color}: Props) {
  return (
    <View
      style={[
        styles.box,
        rounded && styles.rounded,
        sizes[size],
        {backgroundColor: color},
      ]}
    />
  );
}

Box.defaultProps = {
  size: 'medium',
  color: 'black',
};

const styles = StyleSheet.create({
  box: {
    width: 64,
    height: 64,
    backgroundColor: 'black',
  },
  rounded: {
    borderRadius: 16,
  },
  small: {
    width: 32,
    height: 32,
  },
  medium: {
    width: 64,
    height: 64,
  },
  large: {
    width: 128,
    height: 128,
  },
});

const sizes: {[key in SIZE]: ViewStyle} = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

export default Box;
