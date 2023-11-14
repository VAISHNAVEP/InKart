import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDimensionContext} from '../../context';
import style from './style';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import CommonHeaderRight from '../../components/CommonHeaderRight';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../components/common/colors';
import StarRating from 'react-native-star-rating-widget';
import MoreInfo from './Components/MoreInfo';
import ExtraInfo from './Components/ExtraInfo';
import ProductReview from './Components/ProductReview';
import DeliveryInfo from './Components/DeliveryInfo';
import ProductScroll from '../../components/ProductScroll';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {updateCartCount} from '../../storage/action';
import {useDispatch, useSelector} from 'react-redux';
const ProductDetails = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [rating, setRating] = useState(5);
  const scrollRef = useRef(null);
  const [ProductDetailsObj, setProductDetails] = useState({});
  const [qun, setQun] = useState(1);
  const route = useRoute();
  const {product} = route.params;
  const dispatch = useDispatch();
  //select data from redux//
  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => <CommonHeaderRight cart={true} share={true} />,
      title: '',
    });
  }, []);
  useEffect(() => {
    setProductDetails(product);
  }, [product]);
  //function to we press product in productdetails screen need to move top//
  const navigationNeeded = (val, item) => {
    if (val) {
      scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
      setProductDetails(item);
    }
  };
  //FUNCTION TO ADD CART COUNT//
  const handleQuantity = type => {
    if (type === 'plus') {
      setQun(qun + 1);
    } else {
      if (qun === 1) {
        return;
      } else {
        setQun(qun - 1);
      }
    }
  };

  const handleAddToCart = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', ProductDetailsObj.id)
      .get()
      .then(snapshot => {
        //if there is no item in cart add new item//
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: ProductDetailsObj.description,
            name: ProductDetailsObj.name,
            price: ProductDetailsObj.price,
            quantity: qun,
            userId: userId,
            productId: ProductDetailsObj.id,
            image: ProductDetailsObj.image,
          });
          dispatch(updateCartCount(cartCount + 1));
          //if item existed then add that item quantity//
        } else {
          firestore()
            .collection('Cart')
            .doc(snapshot?.docs[0].id)
            .update({
              quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + qun,
            });
        }
      });
  };

  return (
    <View>
      <ScrollView ref={scrollRef}>
        <View style={responsiveStyle.heart}>
          {/*<Ionicons name="heart-outline" size={30} color={colors.red} />*/}
          <Ionicons name="heart-sharp" size={30} color={colors.red} />
        </View>
        <Image
          source={{uri: ProductDetailsObj?.image}}
          style={responsiveStyle.proImage}
        />
        <View style={responsiveStyle.mainView}>
          <View style={responsiveStyle.padding}>
            <Text style={responsiveStyle.name}>{ProductDetailsObj?.name}</Text>
            {/*to show rating*/}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <StarRating rating={rating} onChange={setRating} />
              <Text
                style={{
                  color: colors.gray,
                  marginLeft: 10,
                  fontFamily: 'Lato-Regular',
                  fontSize: 18,
                }}>
                (1 rating)
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={responsiveStyle.price}>
                ₹{parseFloat(ProductDetailsObj?.price).toFixed(2)}
              </Text>
              <Text
                style={{
                  color: colors.primaryGreen,
                  marginLeft: 10,
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                }}>
                25% off
              </Text>
            </View>
            <MoreInfo />
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.gray,
                paddingVertical: 10,
              }}>
              <Text style={responsiveStyle.descriptionHead}>
                Product Details
              </Text>
              <Text style={responsiveStyle.description}>
                {ProductDetailsObj?.description}
              </Text>
            </View>
            <ExtraInfo />
            <ProductReview product={product} />
            <DeliveryInfo />
          </View>
          <ProductScroll isNavigationNeeded={navigationNeeded} />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 25,
          alignSelf: 'center',
          padding: 15,
          borderRadius: 8,
          backgroundColor: colors.primaryGreen,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '95%',
        }}>
        <View
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: colors.white,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => handleQuantity('minus')}>
            <AntDesign name="minus" size={20} color={colors.primaryGreen} />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Black',
              fontSize: 20,
              marginHorizontal: 15,
            }}>
            {qun}
          </Text>
          <TouchableOpacity onPress={() => handleQuantity('plus')}>
            <Feather name="plus" size={20} color={colors.primaryGreen} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAddToCart}>
          <Text
            style={{
              color: colors.white,
              fontFamily: 'Lato-Black',
              fontSize: 18,
            }}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;
