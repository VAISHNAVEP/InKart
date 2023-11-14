import {StyleSheet} from 'react-native';
import colors from '../../../../components/common/colors';

const style = (width, height) =>
  StyleSheet.create({
    image: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    contentView: {
      backgroundColor: colors.white,
      padding: 15,
      marginRight: 15,
      borderRadius: 15,
    },
    head: {
      fontFamily: 'Lato-Black',
      fontSize: 18,
      marginBottom: 10,
    },
   container:{
    backgroundColor:colors.secondaryGreen,
    borderRadius:15,
    margin:15,
    padding:15,
   } 
  });
export default style;
