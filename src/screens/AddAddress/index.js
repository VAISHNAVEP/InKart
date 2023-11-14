import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDimensionContext} from '../../context';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import CommonButton from '../../components/CommonButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
navigator.geolocation = require('@react-native-community/geolocation'); //to access location//
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; //to access map//
import Geolcation from '@react-native-community/geolocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/common/colors';
import Snackbar from 'react-native-snackbar';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {updateCartCount} from '../../storage/action';

const AddAddress = () => {
  const dimensions = useDimensionContext();
  const navigation = useNavigation();
  const route = useRoute();
  const {cartProducts, total} = route.params;
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [newPosition, setNewPosition] = useState({});
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = useSelector(state => state.userId);
  const email = useSelector(state => state.email);
  const mobileNumber = useSelector(state => state.mobileNumber);
  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentLocation();
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type={'back'} />,
    });
  }, []);

  //function to indicate current location//
  const getCurrentLocation = () => {
    Geolcation.getCurrentPosition(info => {
      setNewPosition({
        latitude: info.coords?.latitude ?? 0,
        longitude: info.coords?.longitude ?? 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    });
    Snackbar.show({
      text: 'Current location is fetched',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: colors.primaryGreen,
      textColor: colors.white,
    });
  };

  const handleCreateOrder = async paymentID => {
    //using slice to reduce length of paymentid//
    const smallId = paymentID.slice(4, 12);
    //order details added to firestore 'order' collection//
    await firestore()
      .collection('Orders')
      .add({
        orderId: String(smallId).toUpperCase(),
        created: Date.now(),
        updated: Date.now(),
        orderStatus: 'Ordered',
        totalAmount: total,
        address: address,
        userId: userId,
        paymentMethod: 'online',
        cartItems: cartProducts,
        userName: firstName + '' + lastName,
        userEmail: email,
        userPhone: mobileNumber,
        expDelDate: '',
      })
      //after success order process cart products automatically clean //
      .then(async resp => {
        await firestore()
          .collection('Cart')
          .where('userId', '==', userId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref
                .delete()
                .then(() => {
                  setLoading(false);
                  //if payment success need to reduce cartcount//
                  dispatch(updateCartCount(0));
                  Snackbar.show({
                    text: 'Your Order is successfully placed',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: colors.primaryGreen,
                    textColor: colors.white,
                  });
                  setTimeout(() => {
                    navigation.goBack();
                  }, 2000);
                })
                .catch(err => {
                  console.warn(err);
                });
            });
          });
      });
  };

  //data passing to razorpay gateway//
  const onButtonPress = () => {
    var options = {
      description: 'Inkart Products purchase',
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_zH5CZj3CH0B7u7',
      amount: parseInt(total, 10) * 100,
      name: 'Inkart',
      prefill: {
        email: email,
        contact: mobileNumber,
        name: `${firstName}${lastName}`,
      },
      theme: {color: colors.pg},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        setLoading(true);
        handleCreateOrder(data.razorpay_payment_id);
        console.log(data.razorpay_payment_id);
      })
      .catch(error => {
        Snackbar.show({
          text: 'Your Order is Failed',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.red,
          textColor: colors.white,
        });
        navigation.goBack();
      });
  };

  return (
    //modal is used to display content after press payment success//
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
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          currentLocation={true}
          fetchDetails={true}
          currentLocationLabel="Current Location"
          query={{
            key: 'AIzaSyBxr99617iBz0j-ao6GzTTl_Kq0TuvZwg4',
            language: 'en',
          }}
          styles={{
            textInput: responsiveStyle.textInput,
            predefinedPlacesDescription: responsiveStyle.description,
          }}
          onPress={(data, details) => {
            //to get location details//
            const location =
              data?.geometry?.location ?? details?.geometry?.location;
            const positionData = {
              latitude: location?.lat ?? 0,
              longitude: location?.lng ?? 0,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            };
            setNewPosition(positionData);
            setAddress(data?.name ?? data?.description);
          }}
        />

        <MapView
          style={{width: '100%', height: 300}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          scrollEnabled={true}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={true}>
          <Marker
            title={address ?? ''}
            description="This is your marker"
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </MapView>
        {/*TO PRINT LOCATION NAME*/}
        {address && (
          <View style={{paddingHorizontal: 15, paddingTop: 15}}>
            <Text
              style={{
                color: colors.black_level_3,
                fontFamily: 'Lato-Regular',
                fontSize: 18,
              }}>
              {address}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={responsiveStyle.TouchView}
          onPress={getCurrentLocation}>
          <View style={responsiveStyle.iconView}>
            <FontAwesome name="location-arrow" size={20} color={colors.white} />
          </View>
          <Text style={responsiveStyle.touchText}>Your Current Location</Text>
        </TouchableOpacity>

        <CommonButton
          buttonText={'Confirm location & Proceed'}
          onButtonPress={onButtonPress}
        />
      </ScrollView>
    </View>
  );
};
export default AddAddress;
