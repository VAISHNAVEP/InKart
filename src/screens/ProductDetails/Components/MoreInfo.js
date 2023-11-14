import {View, Text} from 'react-native';
import React from 'react';
import {useDimensionContext} from '../../../context';
import colors from '../../../components/common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../style';
const MoreInfo = props => {
  const dimensions = useDimensionContext();
  const responsiveStyle =style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: dimensions.windowWidth * 0.43,
          justifyContent: 'center',
          backgroundColor: colors.lightGrey,
          padding: 15,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: colors.black_level_3,
            fontFamily: 'Lato-Regular',
            fontSize: 18,
          }}>
          500g/₹24.00
        </Text>
        <AntDesign name="down" size={25} color={colors.gray} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: dimensions.windowWidth * 0.43,
          justifyContent: 'center',
          backgroundColor: colors.lightGrey,
          padding: 15,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: colors.black_level_3,
            fontFamily: 'Lato-Regular',
            fontSize: 18,
          }}>
          Delivery Time
        </Text>
        <AntDesign name="down" size={25} color={colors.gray} />
      </View>
    </View>
  );
};

export default MoreInfo;
