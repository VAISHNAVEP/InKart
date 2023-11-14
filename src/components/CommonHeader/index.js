import { View, Text ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { useDimensionContext } from '../../context';

const CommonHeader = () => {
   const navigation=useNavigation(); 
   const dimensions= useDimensionContext();
   const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
   )
  return (
    <View style={responsiveStyle.container}>
     <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
     <Image source={require('../../assets/images/drawer.png')} style={responsiveStyle.sideIcon} />
     </TouchableOpacity>
    <Image source={require('../../assets/images/logo1.jpeg')} style={responsiveStyle.logo} />
    </View>
  )
}

export default CommonHeader;