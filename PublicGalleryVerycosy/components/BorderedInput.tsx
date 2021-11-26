import React, {Ref} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  hasMarginBottom?: boolean;
}

function BorderedInput({hasMarginBottom, ...rest}: Props, ref: Ref<TextInput>) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      ref={ref}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

export default React.forwardRef(BorderedInput);
