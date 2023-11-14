import React from 'react';
import {TouchableOpacity, Text, View,Image} from 'react-native';
import style from './style';
import colors from '../common/colors';
const CustomButton = props => {
  const {type, handleButtonPress, buttonText,icon} = props;
  return (
    <TouchableOpacity
      style={style.button}
      onPress={handleButtonPress}
      style={[
        style.button,
        {
          backgroundColor:
            type === 'primary' ? colors.primaryGreen : colors.secondaryGreen,
        },
      ]}>
      {type !== 'primary' ? <Image source={icon} style={style.icon} /> :null}  
      <Text
        style={[
          
          {color: type === 'primary' ? colors.white : colors.black_level_3,
          fontFamily:type === 'primary' ? 'Lato-Bold' : 'Lato-Regular',
          fontSize: type === 'primary' ? 20:14
        },
        ]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
