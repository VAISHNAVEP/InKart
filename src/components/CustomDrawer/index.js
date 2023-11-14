import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../common/colors';
import style from './style';
import {useDimensionContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {signout} from '../../storage/action';

const CustomDrawer = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //to get user information from redux using useselector//
  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const email = useSelector(state => state.email);
  const profileImage = useSelector(state => state.profileImage);

  const Contents = [
    {
      itemId: 0,
      itemName: 'Home',
      navigateTo: 'MyFooter',
      icon: require('../../assets/images/home.png'),
    },
    {
      itemId: 1,
      itemName: 'Shop By Category',
      navigateTo: 'Categories',
      icon: require('../../assets/images/drawer.png'),
    },
    {
      itemId: 2,
      itemName: 'Orders',
      navigateTo: 'Orders',
      icon: require('../../assets/images/orders.png'),
    },
    {
      itemId: 3,
      itemName: 'Your Wishlist',
      navigateTo: 'Wishlist',
      icon: require('../../assets/images/wishlist.png'),
    },
    {
      itemId: 4,
      itemName: 'Your Account',
      navigateTo: 'Account',
      icon: require('../../assets/images/user.png'),
    },
  ];

  //function for signout//
  const handleSignout = () => {
    dispatch(signout());
  };

  return (
    <View style={style.mainCon}>
      {/* profile */}
      <TouchableOpacity
        style={responsiveStyle.accountTouch}
        onPress={() => navigation.navigate('Account')}>
        <View style={responsiveStyle.accountImageView}>
          <Image
            //TO UPLOAD PROFILE IMAGE BASED ON PROFILE IMAGE COMING FIREBASE//
            source={
              profileImage === ''
                ? require('../../assets/images/dummy.jpg')
                : {uri: profileImage}
            }
            style={responsiveStyle.image}
          />
        </View>
        <View style={responsiveStyle.nameView}>
          <Text style={responsiveStyle.name}>
            {firstName} {lastName}
          </Text>
          <Text style={responsiveStyle.email}>{email}</Text>
        </View>
      </TouchableOpacity>
      {/* drawer Content */}
      <View style={responsiveStyle.commonMargin}>
        <View>
          {Contents.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(item.navigateTo)}
                key={item.itemId}
                style={responsiveStyle.drawerView}>
                <View style={responsiveStyle.drawerInnerView}>
                  <Image source={item.icon} style={responsiveStyle.icon} />
                  <Text style={responsiveStyle.drawerText}>
                    {item.itemName}
                  </Text>
                </View>
                <Image
                  source={require('../../assets/images/arrow-right.png')}
                  style={responsiveStyle.iconSecond}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {/* logout */}
      <View>
        <TouchableOpacity
          onPress={handleSignout}
          style={responsiveStyle.logoutView}>
          <Image
            source={require('../../assets/images/arrow-right.png')}
            style={[responsiveStyle.icon, responsiveStyle.arrow]}
          />
          <Text style={responsiveStyle.logoutText}>Sign Out</Text>
        </TouchableOpacity>
        {/*contact support*/}
        <View style={responsiveStyle.supportView}>
          <Text style={responsiveStyle.supportHead}>Contact Support</Text>
          <Text style={responsiveStyle.supportContent}>
            if you have any problem with the app, feel free to contact our 24
            hours support system
          </Text>
          <View style={responsiveStyle.supportTouch}>
            <Text style={responsiveStyle.supportText}>Contact</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
