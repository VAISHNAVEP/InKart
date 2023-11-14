import {StyleSheet} from 'react-native';
import colors from '../common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      borderRadius: 15,
      backgroundColor: colors.primaryGreen,
      padding: 15,
      width: width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical:15,
      alignSelf:'center',
      
    },
    text: {
      color: colors.white,
      fontFamily: 'Lato-Bold',
      fontSize: 22,
    },
  });
export default style;
