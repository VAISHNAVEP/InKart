import {StyleSheet} from 'react-native';
import colors from '../common/colors';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 15,
    },
    newContainer: {
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 15,
      flexDirection: 'row',
    },
    search: {
      borderWidth: 1,
      borderColor: colors.primaryGreen,
      backgroundColor: colors.secondaryGreen,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      paddingHorizontal:15,
      paddingVertical:6,
      width: width * 0.95,
    },
    newStyle: {
      borderWidth: 1,
      borderColor: colors.primaryGreen,
      backgroundColor: colors.secondaryGreen,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      paddingHorizontal:15,
      paddingVertical:6,
      width: width * 0.775,
    },
    innerView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
    },
    textInput: {
      flex:1,
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      marginLeft: 15,
      color: colors.primaryGreen,
    },
    filter: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.primaryGreen,
    },
  });
export default style;
