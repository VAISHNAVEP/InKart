import {View, Text, ScrollView, Modal, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import {useNavigation, useRoute} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/common/colors';
import CustomButton from '../../components/CustomButton';
import {useDimensionContext} from '../../context';
import firestore from '@react-native-firebase/firestore';
import style from './style';
import Snackbar from 'react-native-snackbar';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type={'back'} action={()=>navigation.navigate('Orders')} />,
      title: 'Order Summary',
    });
  }, []);

  const reOrder = async () => {
    try {
      setLoading(true);
      const smallId = Math.random();
      //order details added to firestore 'order' collection//
      await firestore()
        .collection('Orders')
        .add({
          orderId: String(smallId).slice(4, 12).toUpperCase(),
          created: Date.now(),
          updated: Date.now(),
          orderStatus: 'Ordered',
          totalAmount: item.totalAmount,
          address: item.address,
          userId: item.userId,
          paymentMethod: 'online',
          cartItems: item.cartItems,
          userName: item.userName,
          userEmail: item.userEmail,
          userPhone: item.userPhone,
          expDelDate: '',
        })
        .then(async res => {
          if (res) {
            setTimeout(() => {
              Snackbar.show({
                text: 'Your Order is successfully placed',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
              });
            }, 1000);
            setLoading(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={responsiveStyle.container}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={colors.white} />
        </View>
      </Modal>
      <ScrollView
        style={responsiveStyle.scrollView}
        contentContainerStyle={responsiveStyle.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={responsiveStyle.greenBox}>
          <Feather name="box" size={50} color={colors.white} />
          <View style={responsiveStyle.greenTextBox}>
            <Text
              style={{
                color: colors.white,
                fontFamily: 'Lato-Regular',
                fontSize: 18,
              }}>
              Order Id: #{item?.orderId ?? 'UYTGH89'}
            </Text>
            <Text
              style={{
                color: colors.white,
                fontFamily: 'Lato-Black',
                fontSize: 20,
              }}>
              {item?.orderStatus ?? ''}
            </Text>
          </View>
        </View>
        <View style={{marginVertical: 20}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Items:
          </Text>
          {/*map and display productdetails*/}
          {item?.cartItems &&
            item.cartItems.map((ele, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.primaryGreen,
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      marginRight: 15,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: 'Lato-Bold',
                        fontSize: 18,
                      }}>
                      {ele.quantity}
                    </Text>
                  </View>
                  <FontAwesome5
                    name="star-of-life"
                    size={16}
                    color={colors.black_level_1}
                  />
                  <View
                    style={{width: '55%', overflow: 'hidden', marginLeft: 10}}>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: 'Lato-Regular',
                        fontSize: 18,
                      }}>
                      {ele.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.black_level_3,
                        fontFamily: 'Lato-Light',
                        fontSize: 15,
                      }}>
                      {ele.description}
                    </Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text
                      style={{
                        color: colors.black_level_3,
                        fontFamily: 'Lato-Bold',
                        fontSize: 18,
                      }}>
                      ₹{ele.price}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Details
          </Text>
          <View
            style={{
              marginVertical: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 20,
              borderBottomColor: colors.black_level_3,
              borderBottomWidth: 1,
            }}>
            <View>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                Bag Total
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                Coupon Discount
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                Delivery
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  lineHeight: 25,
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                ₹134
              </Text>
              <Text
                style={{
                  color: colors.red,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                Apply Coupon
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                ₹50.00
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              ₹{item.totalAmount}
            </Text>
          </View>
        </View>
        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Address:
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            Rick Nelson
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            HKL Appartments,678
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            NK.09. US, 890876
          </Text>
        </View>
        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Method:
          </Text>
          <View
            style={{
              marginVertical: 15,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <FontAwesome name="cc-visa" size={30} color={colors.black} />
            <View style={{marginLeft: 15}}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                *** *** *** 7876
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                {item?.paymentMethod ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: 15,
          backgroundColor: colors.white,
        }}>
        <CustomButton
          type="primary"
          handleButtonPress={reOrder}
          buttonText={'Reorder'}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
