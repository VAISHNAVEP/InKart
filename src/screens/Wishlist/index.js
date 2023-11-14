import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDimensionContext} from '../../context';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import colors from '../../components/common/colors';
import {updateCartCount} from '../../storage/action';
import CommonHeaderRight from '../../components/CommonHeaderRight';

const WishList = () => {
  const navigation = useNavigation();
  const cartCount = useSelector(state => state.cartCount);
  const userId = useSelector(state => state.userId);
  //function to place image right section of header//

  const dimensions = useDimensionContext();
  const responsivestyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [wishItems, setWishItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getWishList();
    navigation.setOptions({
      headerRight: () => <CommonHeaderRight cart={true} />, //to update cart count//
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);

  //function to get productscroll selected products using firebase api//
  const getWishList = async () => {
    await firestore()
      .collection('Wishlist')
      .where('userId', '==', userId)
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          setWishItems([]);
        } else {
          const objArray = [];
          snapShot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setWishItems(objArray);
        }
      });
  };

  const addToCart = async ItemToAdd => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', ItemToAdd.id)
      .get()
      .then(snapshot => {
        //if there is no item in cart add new item//
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: ItemToAdd.description,
            name: ItemToAdd.name,
            price: ItemToAdd.price,
            quantity: 1,
            userId: userId,
            productId: ItemToAdd.id,
            image: ItemToAdd.image,
          });
          dispatch(updateCartCount(cartCount + 1));
          //if item existed then add that item quantity//
        } else {
          firestore()
            .collection('Cart')
            .doc(snapshot?.docs[0].id)
            .update({
              quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
            });
        }
      });
  };

  //function to delete items from list//
  const removeItem = async ItemToRemove => {
    await firestore()
      .collection('Wishlist')
      .doc(ItemToRemove.id)
      .delete()
      .then(() => {
        //to ignore deleted items and filter only existed items//
        const filteredWishlist = wishItems.filter(
          ele => ele.id !== ItemToRemove.id,
        );
        setWishItems(filteredWishlist);
      });
  };

  //navigate 'shop' page to purchase items//
  const navigateToShop = () => {
    navigation.navigate('Shop', {type: 'all'});
  };

  return (
    <View style={responsivestyle.container}>
      <FlatList
        data={wishItems}
        showsVerticalScrollIndicator={false}
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
              <TouchableOpacity style={{padding: 15}} onPress={navigateToShop}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                    color: colors.black,
                  }}>
                  Go To Shop
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          return (
            <View style={responsivestyle.productView}>
              <Image
                source={{uri: item.image}}
                style={responsivestyle.productImage}
              />
              <View style={responsivestyle.secondView}>
                <Text style={responsivestyle.title} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={responsivestyle.desc} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={responsivestyle.bottomView}>
                  <Text style={responsivestyle.price}> ₹ {item.price}</Text>
                  <TouchableOpacity
                    onPress={() => addToCart(item)}
                    style={responsivestyle.cartView}>
                    <Text style={responsivestyle.cartText}>Add To Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => removeItem(item)}
                style={responsivestyle.removeView}>
                <Image
                  source={require('../../assets/images/delete-white.png')}
                  style={responsivestyle.remove}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default WishList;
//navigation options screenil/componentil set cheyyanan 'navigation.setoptions' use cheyyunnath//
