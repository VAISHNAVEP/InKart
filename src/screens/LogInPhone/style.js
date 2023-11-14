import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';


const style =(width,height)=> StyleSheet.create({
  topBg: {
    width: width,
    height: width * 0.2,
    resizeMode: 'cover',
  },
  ScrollView: {
    backgroundColor: colors.white_level_1,
    marginTop: -width * 0.2,
    flex: 1,
    borderTopRightRadius: width * 0.05,
    borderTopLeftRadius: width * 0.05,
    overflow: 'hidden',
    padding: width * 0.03,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  loginText: {
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    color: colors.steel,
  },
  container: {
    height: height,
    
  },
  createNew: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: colors.steel,
    textAlign: 'center',
    marginVertical: width * 0.025,
  },
  footer: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryGreen,
  },
  errorText:{
    fontFamily:'Lato-Italic',
    fontSize:15,
    color:colors.red,
    marginTop:20,
  }

});
export default style;
//parameter ayi width,height pass cheythath page responsive aakkanan//
