import {View, Text} from 'react-native';
import React from 'react';
import colors from '../../../../components/common/colors';
import {useDimensionContext} from '../../../../context';
import style from './style';

const OrderTotal = ({charges, total}) => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  return (
    <View>
      <View style={responsiveStyle.container}>
        <View>
          <Text style={responsiveStyle.head}>Order Details</Text>
          <Text style={responsiveStyle.content}>Bag Total</Text>
          <Text style={responsiveStyle.content}>Bag Savings</Text>
          <Text style={responsiveStyle.content}>Coupon Discount</Text>
          <Text style={responsiveStyle.endContent}>Delivery</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={responsiveStyle.headEnd}>.</Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              lineHeight: 30,
              marginBottom: 15,
            }}>
            ₹{parseFloat(total).toFixed(2)}
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 20,
              lineHeight: 30,
              color: colors.primaryGreen,
            }}>
            0.00
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 20,
              lineHeight: 30,
              color: colors.red,
            }}>
            Apply Coupon
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              lineHeight: 30,
              marginBottom: 15,
              color: colors.black_level_1,
            }}>
            ₹{parseFloat(charges).toFixed(2)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={responsiveStyle.total}>Order Details</Text>
        <Text style={responsiveStyle.total}>
          ₹{parseFloat(total + charges).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default OrderTotal;
