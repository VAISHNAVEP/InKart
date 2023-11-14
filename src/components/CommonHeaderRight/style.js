import {StyleSheet} from 'react-native';
import colors from '../common/colors';

const style = (width, height) =>
  StyleSheet.create({
    padding: {
      paddingRight: 15,
    },
    image: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    cartCount: {
      backgroundColor: colors.red,
      position: 'absolute',
      right: 7,
      top: -6,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      overflow: 'hidden',
      paddingHorizontal: 6,
      paddingVertical: 2,
      zIndex: 9,
    },
    count: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: colors.white,
      textAlign: 'center',
    },
    flexStyle:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
    }
  });
export default style;
