import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDimensionContext} from '../../context';
import Snackbar from 'react-native-snackbar';
import style from './style';
import colors from '../../components/common/colors';
import OrderTotal from './components/OrderTotal';
import CommonButton from '../../components/CommonButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {updateCartCount} from '../../storage/action';
const Cart = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [charges, setCharges] = useState(0);

  const isFocused = useIsFocused();
  //to use 'isfocused' when focuse on page this will be automatically rerender//
  useEffect(() => {
    if (isFocused) {
      getCartProducts();
    }
  }, [isFocused]);

  //to set when cart is empty show delivery charge '0'//
  useEffect(() => {
    if (cartProducts.length > 0) {
      setCharges(50);
    } else {
      setCharges(0);
    }
  }, [cartProducts]);

  //select user id from redux//
  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  const email = useSelector(state => state.email);
  const mobileNumber = useSelector(state => state.mobileNumber);

  //call api from firestore and display the updated cart data//
  const getCartProducts = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          let totalAmount = 0;
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              //to add total amount in cart//
              const amount =
                parseFloat(doc?.data().price) * parseInt(doc?.data().quantity);
              totalAmount = totalAmount + amount;
              const responseData = {id: doc.id, ...doc?.data()};
              result.push(responseData);
            }
          });
          setTotal(totalAmount);
          setCartProducts(result);
        } else {
          //when payment is success full need to cartproducts and cart total is empty//
          setCartProducts([]);
          setTotal(0);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);

  const updateArray = productInfo => {
    const result = cartProducts.filter(x => {
      return x.id !== productInfo.id;
    });
    //to remove items from cart automatically reduce cart total amount//
    setTotal(total - parseFloat(productInfo.price));
    //to reduce item from cart//
    dispatch(updateCartCount(cartCount - 1));
    setCartProducts(result);
  };

  const handleTotal = (type, productInfo) => {
    if (type === 'add') {
      setTotal(total + parseFloat(productInfo.price));
    } else {
      setTotal(total - parseFloat(productInfo.price));
    }
  };

  //function to check out//
  const onButtonPress = () => {
    if (cartProducts.length > 0) {
      //if email or mobile number is not found go to update prifle section//
      if (email === '' || mobileNumber === '') {
        Snackbar.show({
          text: 'You have to complete your profile to continue',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.red,
          textColor: colors.white,
        });
        navigation.navigate('Account');
      } else {
        navigation.navigate('AddAddress', {
          cartProducts: cartProducts,
          //to pass total amount to payment gateway//
          total: parseFloat(total + charges).toFixed(2),
        });
      }
    } else {
      Snackbar.show({
        text: 'Your cart is empty',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };
  return (
    <View style={responsiveStyle.container}>
      <FlatList
        data={cartProducts}
        extraData={cartProducts}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                padding: 30,
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Black',
                  color: colors.black,
                  fontSize: 25,
                }}>
                Cart is empty
              </Text>
              <TouchableOpacity>
                <Text>Go to shop</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={index => String(index)}
        renderItem={({item, index}) => (
          <RenderItem
            item={item}
            index={index}
            updateArray={updateArray}
            handleTotal={handleTotal}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <>
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
                    50
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
                      On your first Order
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.black_level_3,
                        fontSize: 12,
                      }}>
                      order above 2500 rupees.
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
                <View
                  style={[
                    responsiveStyle.circleCenter,
                    {marginBottom: -25 / 2},
                  ]}></View>
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
                    SDC43
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
            <OrderTotal total={total} charges={charges} />
            <CommonButton
              onButtonPress={onButtonPress}
              buttonText={'Proceed to Checkout'}
            />
          </>
        )}
      />
    </View>
  );
};

const RenderItem = ({item, index, updateArray, handleTotal}) => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [qun, setQun] = useState(item.quantity);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setQun(item.quantity);
  }, [item]);
  //select user id from redux//
  const userId = useSelector(state => state.userId); //CARTCOUNT IN SELECTOR
  const addToCart = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', item.productId)
      .get()
      .then(snapshot => {
        //if item existed then add that item quantity//
        firestore()
          .collection('Cart')
          .doc(snapshot?.docs[0].id)
          .update({
            quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
          });
        handleTotal('add', item);
      });
  };
  const removeItem = async () => {
    if (qun <= 1) {
      //remove from cart//
      await firestore()
        .collection('Cart')
        .doc(item.id)
        .delete()
        .then(() => {
          updateArray(item);
        });
    } else {
      //update qun//
      setQun(qun - 1);
      firestore()
        .collection('Cart')
        .doc(item.id)
        .update({
          quantity: parseInt(item.quantity, 10) - 1,
        });
      handleTotal('minus', item);
    }
  };

  //function to redirect 'productdetails' page//
  const redirectToProductDetails = () => {
    navigation.navigate('ProductDetails', {product: item});
  };
  return (
    <TouchableOpacity
      onPress={redirectToProductDetails}
      style={responsiveStyle.productView}>
      <Image source={{uri: item.image}} style={responsiveStyle.productImage} />
      <View style={responsiveStyle.nameView}>
        <Text style={responsiveStyle.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={responsiveStyle.des} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={responsiveStyle.priceView}>
          <View style={responsiveStyle.priceView2}>
            <Text style={responsiveStyle.price}>₹{item.price}</Text>
            <View style={responsiveStyle.offView}>
              <Text style={responsiveStyle.offText}>50%</Text>
            </View>
          </View>
          <View style={responsiveStyle.qunView}>
            <TouchableOpacity onPress={removeItem}>
              <Text style={responsiveStyle.qunText1}>-</Text>
            </TouchableOpacity>
            <Text style={responsiveStyle.qunText2}>{qun}</Text>
            <TouchableOpacity
              onPress={() => {
                setQun(qun + 1);
                addToCart();
              }}>
              <Text style={responsiveStyle.qunText1}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Cart;
//usefocuse effect is substitute of useeffect because to focuse on page this will rerender automatically without refresh//
