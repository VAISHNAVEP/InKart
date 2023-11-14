import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from '../common/colors';

const {width, height} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondaryGreen,
    padding: width * 0.02, //0.04
    borderRadius: 8,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  textInput: {
    flex:1,
    color: colors.black_level_3,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    //width: '50%',
    // height:Platform.OS ==='ios' ? height*0.04:height*0.02, ee condition kodukkumbol placeholderil onnum kanunnilla//
    //height:height*0.02,
  },
  icon: {
    width: width * 0.05,
    height: height * 0.05,
    resizeMode: 'contain',
  },
  checkText: {
    fontFamily: 'Lato-Regular',
    color: colors.primaryGreen,
    fontSize: 18,
  },
});
export default style;
