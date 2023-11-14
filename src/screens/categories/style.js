import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white_level_2,
    },
    main: {
      flex: 1,
    },
    catImage: {
      width: width * 0.2,
      height: width * 0.2,
      resizeMode: 'contain',
      margin: 10,
    },
    catFlatStyle: {
      padding: 10,
      backgroundColor: colors.secondaryGreen,
      width: width * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    catTouch: {
      borderBottomColor: colors.black_level_3,
      borderBottomWidth: 0.8,
    },
    rowStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    backImage: {
      width: width * 0.65,
      height: height * 0.175,
      resizeMode: 'contain',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 15,
      overflow: 'hidden',
      padding: 15,
    },
    catName: {
      fontFamily: 'Lato-Black',
      fontSize: 22,
    },
    catDesc: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
    },
    proName: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    proDesc: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
    },
    proImage: {
      width: width * 0.15,
      height: width * 0.15,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    imageBg: {
      backgroundColor: colors.secondaryGreen,
      padding: 10,
      justifyContent: 'center',
      borderRadius: 15,
      marginBottom:5,
    },
    proStyle: {
      justifyContent: 'center',
      padding: 10,
    },
    proContainer: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default style;
