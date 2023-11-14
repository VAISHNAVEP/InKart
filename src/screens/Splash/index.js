import {View, Text, Image} from 'react-native';
import React from 'react';
import colors from '../../components/common/colors';

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.white,
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/images/logo1.jpeg')}
        style={{width: 200, height: 200, resizeMode: 'contain'}}
      />
    </View>
  );
};

export default Splash;
