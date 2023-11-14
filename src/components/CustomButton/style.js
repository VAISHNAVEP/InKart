import { Dimensions,StyleSheet } from "react-native";
import colors from "../common/colors";

const{width,height}=Dimensions.get('screen');
const style=StyleSheet.create({
   button:{
    padding:width*0.04,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:width*0.025,
    flexDirection:'row',
   } ,
   icon:{
      width:width * 0.08,
      height:width * 0.08,
      marginRight:width * 0.025,
   }

});
export default style;
