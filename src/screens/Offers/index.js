import {View, Text, ScrollView, FlatList} from 'react-native';
import React, { useEffect } from 'react';
import CustomSearch from '../../components/CustomSearch';
import style from './style';
import colors from '../../components/common/colors';
import {useDimensionContext} from '../../context';
import { useNavigation } from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
const Offers = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft/>,
    });
  }, []);
  const offerArray = [
    {
      offer: '41',
      head: 'Midnight Sale Offer',
      content: 'On all orders above Rs.900',
      code: 'AB867',
    },
    {
      offer: '50',
      head: 'Monsoon Sale Offer',
      content: 'On all orders above Rs.1500',
      code: 'NJ867',
    },
    {
      offer: '20',
      head: 'Christmas Sale Offer',
      content: 'On all orders above Rs.500',
      code: 'IO867',
    },
    {
      offer: '15',
      head: 'Diwali Sale Offer',
      content: 'On all orders above Rs.300',
      code: 'FG867',
    },
    {
      offer: '60',
      head: 'Onam Sale Offer',
      content: 'On all orders above Rs.2000',
      code: 'YU867',
    },
    {
      offer: '80',
      head: 'Eid Sale Offer',
      content: 'On all orders above Rs.2500',
      code: 'YT867',
    },
  ];
  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <FlatList
          data={offerArray}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={responsiveStyle.contentStyle}
          renderItem={({item, index}) => {
            return (
              <View style={responsiveStyle.renderView}>
                {/*start design*/}
                <View style={responsiveStyle.offCircleView}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>

                <View
                  style={{
                    width: '64%',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                    padding: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Black',
                        color: colors.primaryGreen,
                        fontSize: 50,
                      }}>
                      {item.offer}
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.primaryGreen,
                          fontSize: 14,
                        }}>
                        %
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.primaryGreen,
                          fontSize: 14,
                        }}>
                        OFF
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          fontFamily: 'Lato-Bold',
                          color: colors.black,
                          fontSize: 16,
                        }}>
                        {item.head}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.black_level_3,
                          fontSize: 12,
                        }}>
                        {item.content}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                  }}>
                  <View style={responsiveStyle.circleCenter}></View>
                  <View style={[responsiveStyle.circleCenter ,{marginBottom:-25/2}]}></View>
                </View>
                <View
                  style={{
                    width: '25%',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 15,
                    paddingVertical: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      color: colors.black_level_3,
                      fontSize: 14,
                    }}>
                    Use Code
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      justifyContent: 'center',
                      borderRadius: 15,
                      backgroundColor: colors.primaryGreen,
                      overflow: 'hidden',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.white,
                        textAlign: 'center',
                      }}>
                      {item.code}
                    </Text>
                  </View>
                </View>

                {/*end design*/}
                <View style={{marginLeft: -25 / 2}}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Offers;
