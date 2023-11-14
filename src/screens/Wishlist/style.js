import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white_level_3,
      padding: 15,
    },
    cartCount: {
      backgroundColor: colors.red,
      position: 'absolute',
      right: 10,
      top: -10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      overflow: 'hidden',
      paddingHorizontal: 6,
      paddingVertical:2,
      zIndex: 9,
    },
    count: {fontFamily: 'Lato-Bold', fontSize: 16, color: colors.white},
    removeView: {
      position: 'absolute',
      top: -10,
      right: 0,
      backgroundColor: colors.red,
      borderRadius: 15,
      overflow: 'hidden',
      padding: 5,
    },
    remove: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      marginLeft: 4,
    },
    cartIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      marginRight: 15,
    },
    productImage: {
      width: 90,
      height: 90,
      resizeMode: 'contain',
    },
    productView: {
      alignSelf: 'center',
      backgroundColor: colors.white,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      width: width * 0.9,
      padding: 15,
      marginTop: 15,
    },
    secondView: {
      borderLeftColor: colors.gray,
      borderLeftWidth: 1,
      paddingLeft: 10,
      marginLeft: 10,
      width: width * 0.6,
      overflow: 'hidden',
    },
    title: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: colors.black,
    },
    price: {
      fontFamily: 'Lato-Bold',
      fontSize: 15,
      color: colors.black,
    },
    desc: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.black_level_3,
    },
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    offView: {
      borderRadius: 15,
      backgroundColor: colors.primaryGreen,
      paddingHorizontal: 5,
      padding: 5,
      marginHorizontal: 5,
    },
    offText: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: colors.white,
    },
    cartView: {
      borderRadius: 15,
      borderColor: colors.primaryGreen,
      borderWidth: 1,
      padding: 5,
      marginHorizontal: 5,
    },
    cartText: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: colors.primaryGreen,
    },
  });
export default style;
