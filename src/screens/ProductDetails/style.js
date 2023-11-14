import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    proImage: {
      width: width,
      height: width * 0.7,
      resizeMode: 'contain',
      marginVertical: 25,
    },
    heart: {
      position: 'absolute',
      right: 0,
      marginTop: 10,
    },
    mainView: {
      backgroundColor: colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      shadowColor: '#000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 15,
      paddingBottom: 100,
    },
    name: {
      fontFamily: 'Lato-Black',
      fontSize: 30,
      marginBottom: 10,
    },
    price: {
      fontFamily: 'Lato-SemiBold',
      fontSize: 20,
      marginVertical: 10,
      color: colors.black_level_3,
    },
    descriptionHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    description: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.gray,
    },
    padding: {
      padding: width * 0.05,
    },
  });
export default style;
