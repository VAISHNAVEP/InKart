import {StyleSheet} from 'react-native';
import colors from '../common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: colors.white,
    },
    headView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headText: {
      fontFamily: 'Lato-Bold',
      fontSize: 22,
      color: colors.black,
    },
    contentText: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.black,
    },
    seeAll: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.black,
    },
  });
export default style;
