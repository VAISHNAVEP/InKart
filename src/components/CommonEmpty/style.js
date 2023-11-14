import {StyleSheet} from 'react-native';
import colors from '../common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderRadius:8,
      borderColor:colors.red,
      borderWidth:1,
      padding:10,
      backgroundColor:colors.tranRed,
    },
    title: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color:colors.red,
    },
  });
export default style;
