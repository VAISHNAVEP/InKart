import {View, TouchableOpacity, Image, Text, Share} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDimensionContext} from '../../context';
import style from './style';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../common/colors';
import { useSelector } from 'react-redux';

const CommonHeaderRight = ({cart, share, plus, handlePlusIcon}) => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsivestyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const{cartCount}=useSelector(state=>state)
  const handleClick = async type  => {
    if (type ==='cart') {
      navigation.navigate('Cart');
    } else if (type ==='share') {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    }
  };
  return (
    <View style={responsivestyle.flexStyle}>
      {share ? (
        <TouchableOpacity style={responsivestyle.padding} onPress={()=>handleClick('share')}>
          <EvilIcon name="share-google" size={45} color={colors.black} />
        </TouchableOpacity>
      ) : null}
      {plus ? (
        <TouchableOpacity
          style={responsivestyle.padding}
          onPress={handlePlusIcon}>
          <FontAwesome name="plus-square-o" size={40} color={colors.black} />
        </TouchableOpacity>
      ) : null}
      {cart ? (
        <TouchableOpacity style={responsivestyle.padding} onPress={()=>handleClick('cart')}>
          <>
            <View style={responsivestyle.cartCount}>
              <Text style={responsivestyle.count}>{cartCount}</Text>
            </View>
            <Image
              source={require('../../assets/images/cart.png')}
              style={responsivestyle.image}
            />
          </>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CommonHeaderRight;
