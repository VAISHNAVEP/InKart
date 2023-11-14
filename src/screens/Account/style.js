import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white_level_2,
      padding: 20,
    },
    head: {
      fontFamily: 'Lato-Bold',
      fontSize: 25,
      textAlign: 'center',
    },
    userImage: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 25,
    },
    image: {
      width: width * 0.4,
      height: width * 0.4,
      borderRadius: width * 0.2,
    },
    bigImage: {
      width: width * 0.8,
      height: width * 0.8,
    },
    editTouch: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    edit: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    modalBack: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    closeChoose: {
      backgroundColor: colors.white,
      borderRadius: 25,
      position: 'absolute',
      zIndex: 9,
      right: -10,
      top: -10,
    },
    close: {
      backgroundColor: colors.white,
      borderRadius: 25,
      position: 'absolute',
      zIndex: 9,
      right: -10,
      top: -10,
    },
    selectBox: {
      backgroundColor: colors.white_level_2,
      padding: 25,
      borderRadius: 15,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    touch: {
      padding: 15,
      justifyContent: 'center',
      backgroundColor: colors.primaryGreen,
      borderRadius: 15,
      marginHorizontal: 10,
    },
    pickText: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.white,
    },
  });
export default style;
