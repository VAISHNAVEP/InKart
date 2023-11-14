import {StyleSheet} from 'react-native';
import colors from '../../../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 15,
      borderBottomColor: colors.black_level_3,
      borderBottomWidth: 1,
    },
    head: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      lineHeight: 50,
      color: colors.black_level_1,
    },
    content: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      lineHeight: 30,
      color: colors.black_level_1,
    },
    endContent: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      lineHeight: 30,
      marginBottom: 10,
      color: colors.black_level_1,
    },
    headEnd: {
      fontFamily: 'Lato-Black',
      fontSize: 20,
      lineHeight: 50,
      color: colors.white_level_3,
    },
    total: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      lineHeight: 50,
      color: colors.black_level_1,
    },
  });
export default style;
