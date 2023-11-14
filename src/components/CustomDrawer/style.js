import {StyleSheet} from 'react-native';
import colors from '../common/colors';
const style = (width, height, isPortrait) =>
  StyleSheet.create({
    mainCon: {
      flex: 1,
      marginVertical: 25,
      padding: 15,
      overflow: 'hidden',
      backgroundColor: colors.white,
    },
    drawerView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      justifyContent: 'space-between',
      marginLeft: 12,
    },
    drawerInnerView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      marginRight: 14,
    },
    arrow: {
      backgroundColor: colors.secondaryGreen,
      overflow: 'hidden',
      borderRadius: 15,
    },
    iconSecond: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
      backgroundColor: colors.secondaryGreen,
      overflow: 'hidden',
      borderRadius: 25 / 2,
      marginRight: 13,
    },
    drawerText: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
    },
    logoutView: {
      borderColor: colors.black_level_3,
      marginLeft: 12,
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 9,
      backgroundColor: colors.secondaryGreen,
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      borderRadius: 20,
      flexDirection: 'row',
    },
    logoutText: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
    },
    supportText: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: colors.white,
    },
    supportHead: {
      fontFamily: 'Lato-Black',
      fontSize: 20,
      lineHeight: 25,
    },
    supportContent: {
      fontFamily: 'Lato-Regular',
      fontSize: 15,
      lineHeight: 19,
    },
    supportView: {
      borderRadius: 20,
      backgroundColor: colors.secondaryGreen,
      padding: 15,
      marginVertical: 15,
    },
    supportTouch: {
      borderRadius: 20,
      backgroundColor: colors.primaryGreen,
      padding: 10,
      marginVertical: 15,
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: width * 0.1,
    },
    accountTouch: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.black_level_3,
      paddingVertical: 15,
    },
    accountImageView: {
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
      backgroundColor: colors.white_level_3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    commonMargin: {
      marginVertical: 15,
    },
    email: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.black_level_2,
    },
    name: {
      fontFamily: 'Lato-Black',
      fontSize: 20,
      color: colors.black_level_1,
    },
    nameView: {
      marginLeft: 15,
      width: '65%',
    },
  });
export default style;
