import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDimensionContext} from '../../context';
import style from './style';
import CustomSearch from '../../components/CustomSearch';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import colors from '../../components/common/colors';
import Snackbar from 'react-native-snackbar';
const Orders = () => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const isFocused = useIsFocused();
  const [ordersArray, setOrdersArray] = useState([]);
  const {userId} = useSelector(state => state);

  useEffect(() => {
    if (isFocused) {
      getOrders();
    }
  }, [isFocused]);
  
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);

  //function to get order details from firebase//
  const getOrders = async () => {
    await firestore()
      .collection('Orders')
      .where('userId', '==', userId)
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          setOrdersArray([]);
        } else {
          const objArray = [];
          snapShot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document?.data()};
              objArray.push(result);
            }
          });
          setOrdersArray(objArray);
        }
      });
  };

  //function to search orderid//
  const handleSearch = async text => {
    await firestore()
      .collection('Orders')
      .where('userId', '==', userId)
      .orderBy('orderId')
      .startAt(String(text))
      .endAt(String(text + '\uf8ff'))
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          setOrdersArray([]);
          Snackbar.show({
            text: 'Order not found',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.primaryGreen,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapShot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document?.data()};
              objArray.push(result);
            }
          });
          setOrdersArray(objArray);
        }
      });
  };

  const navigateToDetails = item => {
    navigation.navigate('OrderDetails', {item: item});
  };

  return (
    <View style={responsiveStyle.container}>
      <CustomSearch
        filter={true}
        placeholder={'Search using order id'}
        mike={false}
        onChangeText={handleSearch}
      />
      <FlatList
        data={ordersArray}
        //to rerender//
        extraData={ordersArray}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                padding: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  color: colors.primaryGreen,
                }}>
                Your WishList is Empty
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigateToDetails(item)}
              style={responsiveStyle.flatView}>
              <View style={responsiveStyle.innerView}>
                <View>
                  <Text style={responsiveStyle.orderId}>
                    ID: {item.orderId}
                  </Text>
                  <Text style={responsiveStyle.orderDate}>
                    Ordered on: {item.created}
                  </Text>
                  <Text style={responsiveStyle.address}>{item.address1}</Text>
                  <Text style={responsiveStyle.address}>{item.address2}</Text>
                  <Text style={responsiveStyle.paidText}>
                    Paid:{''}
                    <Text style={responsiveStyle.greenText}>
                      {item.totalAmount}
                    </Text>
                    , Items:{' '}
                    <Text style={responsiveStyle.greenText}>
                      {item.cartItems.length}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/map.webp')}
                    style={responsiveStyle.mapImage}
                  />
                </View>
              </View>
              <View style={responsiveStyle.bottomView}>
                <Text style={responsiveStyle.bottomText}>Order Shipped</Text>
                <Text style={responsiveStyle.bottomText}>
                  Rate & Review Products
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Orders;
