import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      padding: 15,
    },
    reviewBox: {
      padding: 15,
      backgroundColor: colors.white,
      borderRadius: 14,
      marginVertical: 10,
    },
  });
export default style;
