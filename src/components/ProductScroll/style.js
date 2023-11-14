import {StyleSheet} from 'react-native';
import colors from '../common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {
      padding: width*0.05,
      backgroundColor: colors.white,
    },
  });
export default style;
