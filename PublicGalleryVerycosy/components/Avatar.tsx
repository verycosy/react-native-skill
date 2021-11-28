import React from 'react';
import {Image, ImageProps, ImageSourcePropType, StyleProp} from 'react-native';

interface Avatar {
  source?: ImageSourcePropType;
  size: number;
  style?: StyleProp<ImageProps>;
}

function Avatar({source, size = 32, style}: Avatar) {
  return (
    <Image
      source={source || require('../assets/user.png')}
      resizeMode="cover"
      style={[style, {width: size, height: size, borderRadius: size / 2}]}
    />
  );
}

export default Avatar;
