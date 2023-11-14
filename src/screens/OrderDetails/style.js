import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      padding: width * 0.04,
    },
    contentContainerStyle: {
      paddingBottom: height * 0.15,
    },
    greenBox: {
      marginVertical: width * 0.04,
      backgroundColor: colors.primaryGreen,
      borderRadius: width * 0.04,
      padding: 20,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    greenTextBox: {
      marginLeft: width*0.04,
    },
  });
export default style;
