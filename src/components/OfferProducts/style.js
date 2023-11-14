import {StyleSheet} from 'react-native';
import colors from '../common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: colors.homeSecondaryBg, 
    },
    productView: {
      width: '100%',
      padding: 15,
      marginRight: 15,
      marginVertical: 15,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      overflow: 'hidden',
    },
    productImage: {
      width: 75,
      height: 75,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginVertical: 10,
    },
    nameView: {
      borderLeftWidth: 1,
      paddingHorizontal: 10,
      marginLeft: 10,
      width:width*0.68,
    },
    name: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      color: colors.black_level_1,
    },
    des: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.black_level_3,
    },
    priceView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      width:width*0.625,
    },
    priceView2:{
      flexDirection:'row',
      alignItems:'center',
    },
    price: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: colors.black_level_1,
    },
    offView: {
      padding: 5,
      borderRadius: 15,
      backgroundColor: colors.primaryGreen,
      marginHorizontal: 10,
    },
    offText: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: colors.white,
      marginHorizontal: 10,
    },
    qunView:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      borderRadius:15,
      borderWidth:1,
      borderColor:colors.primaryGreen,
      overflow:'hidden',
      paddingVertical:5,

    },
    qunText1:{
      fontFamily:'Lato-Bold',
      fontSize:20,
      color:colors.black,
      marginHorizontal:10,
    },
    qunText2:{
      fontFamily:'Lato-Bold',
      fontSize:18,
      color:colors.primaryGreen,
      marginHorizontal:5,
    },
  });
export default style;
//'margin horizontal' koduthal margin-left pole leftil ninnum align ayi nilkum//
