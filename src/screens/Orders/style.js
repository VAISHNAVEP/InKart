import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white_level_3,
    },
    flatView: {
      backgroundColor: colors.secondaryGreen,
      borderRadius: 15,
      padding: 15,
      overflow: 'hidden',
      marginTop: 15,
      marginHorizontal: 15,
    },
    innerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: colors.gray,
      borderBottomWidth: 1,
      paddingBottom: 15,
    },
    orderId: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: colors.black,
    },
    mapImage: {
      width: 100,
      height: 100,
      borderRadius: 15,
      overflow: 'hidden',
      resizeMode: 'cover',
    },
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,
    },
    bottomText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.black_level_3,
    },
    greenText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.primaryGreen,
    },
    address: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: colors.gray,
    },
    paidText: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: colors.black,
    },
    orderDate: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: colors.primaryGreen,
    },
  });
export default style;
