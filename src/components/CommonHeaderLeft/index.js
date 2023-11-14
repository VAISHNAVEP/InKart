import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDimensionContext} from '../../context';
import style from './style';

const CommonHeaderLeft = ({type, action}) => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsivestyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const handleClick = () => {
    if (type === 'back') {
      if (action) {
        action();
      } else {
        navigation.goBack();
      }
    } else {
      navigation.toggleDrawer();
    }
  };
  return (
    <View>
      <TouchableOpacity style={responsivestyle.padding} onPress={handleClick}>
        <Image
          source={
            type === 'back'
              ? require('../../assets/images/left-arrow.png')
              : require('../../assets/images/drawer.png')
          }
          style={responsivestyle.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommonHeaderLeft;
