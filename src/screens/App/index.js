import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Login from '../Login';
import SignUp from '../SignUp';
import LogInPhone from '../LogInPhone';
import Home from '../Home';
import {DimentionContextProvider} from '../../context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Categories from '../categories';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from '../Cart';
import CustomDrawer from '../../components/CustomDrawer';
import CustomFooter from '../../components/CustomFooter';
import Search from '../Search';
import Offers from '../Offers';
import Orders from '../Orders';
import WishList from '../Wishlist';
import Account from '../Account';
import style from './style';
import {store} from '../../storage/store';
import Splash from '../Splash';
import Shop from '../Shop';
import ProductDetails from '../ProductDetails';
import Review from '../Review';
import AddAddress from '../AddAddress';
import OrderDetails from '../OrderDetails';
const Drawer = createDrawerNavigator();

const AppDrawer = props => {
  return (
    <Drawer.Navigator
      initialRouteName="MyFooter"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: style.title,
        headerStyle: {
          height: 70,
        },
      }}>
      <Drawer.Screen
        name="MyFooter"
        component={AppFooter}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Categories" component={Categories}></Drawer.Screen>
      <Drawer.Screen name="Orders" component={Orders}></Drawer.Screen>
      <Drawer.Screen name="OrderDetails" component={OrderDetails}></Drawer.Screen>
      <Drawer.Screen name="Wishlist" component={WishList}></Drawer.Screen>
      <Drawer.Screen name="Account" component={Account}></Drawer.Screen>
      <Drawer.Screen name="Shop" component={Shop}></Drawer.Screen>
      <Drawer.Screen
        name="ProductDetails"
        component={ProductDetails}></Drawer.Screen>
      <Drawer.Screen name='Review' component={Review} />  
      <Drawer.Screen name='AddAddress' component={AddAddress} />
        
    </Drawer.Navigator>
  );
};

const Footer = createBottomTabNavigator();
const AppFooter = props => {
  return (
    <Footer.Navigator
      tabBar={props => <CustomFooter {...props} />}
      screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: {fontFamily: 'Lato-Bold', fontSize: 22},
        headerStyle:{
          height:70,
        }
      }}>
      <Footer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Footer.Screen name="Categories" component={Categories}></Footer.Screen>
      <Footer.Screen name="Search" component={Search}></Footer.Screen>
      <Footer.Screen name="Offers" component={Offers}></Footer.Screen>
      <Footer.Screen name="Cart" component={Cart}></Footer.Screen>
    </Footer.Navigator>
  );
};

const AppStack = createNativeStackNavigator();
const AppNavigation = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isLoggedIn]);

  return (
    <DimentionContextProvider>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}}>
          {loading ? (
            <AppStack.Screen name="Splash" component={Splash}></AppStack.Screen>
          ) : (
            <>
              {isLoggedIn ? (
                <AppStack.Screen name="MyDrawer" component={AppDrawer} />
              ) : (
                <>
                  <AppStack.Screen name="Login" component={Login} />
                  <AppStack.Screen name="SignUp" component={SignUp} />
                  <AppStack.Screen name="LogInPhone" component={LogInPhone} />
                </>
              )}
            </>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </DimentionContextProvider>
  );
};
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
