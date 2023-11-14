import {StyleSheet} from 'react-native';
import colors from '../../../../components/common/colors';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    banner: {
      width: width * 0.85,
      height: width * 0.4,
      resizeMode: 'contain',
      borderRadius: 15,
      overflow: 'hidden',
      margin: 15,
    },
    innerView: {
      padding: 15,
    },
    head: {
      fontFamily: 'Lato-Black',
      fontSize: 20,
    },
    content: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
    },
    touch: {
      backgroundColor: colors.primaryGreen,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.3,
      marginVertical: 10,
      borderRadius: 15,
    },
    touchText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.white,
    },
  });
export default style;
