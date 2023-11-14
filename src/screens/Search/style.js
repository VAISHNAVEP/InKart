import { Dimensions, StyleSheet } from "react-native";
import colors from"../../components/common/colors";

const {width,height} =Dimensions.get('screen');
const style=StyleSheet.create({
    container:{
        backgroundColor:colors.white_level_2
    },
    main:{
        flex:1,
    },
});
export default style;