import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import style from './style';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import colors from '../../components/common/colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDimensionContext} from '../../context';
import {validateEmail} from '../../components/common/validations';
import {useDispatch} from 'react-redux';
import {login} from '../../storage/action';

const Login = () => {
  //for responsive ui//
  const dimensions = useDimensionContext();
  // console.warn(dimensions);
  //for responsive ui//
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //for apply responsive ui//
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  //login setup and redirect to home //

  const handleLogin = async () => {
    if (email.trim() !== '' && password.trim() !== '') {
      if (validateEmail(email.trim())) {
        await firestore()
          .collection('User')
          .where('email', '==', email.trim().toLocaleLowerCase())

          .get()
          .then(async snapshot => {
            if (snapshot.empty) {
              Snackbar.show({
                text: 'This user is not registered with us,try creating a new account',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.red,
                textColor: colors.white,
              });
            } else {
              snapshot.forEach(documentSnapshot => {
                const respData = documentSnapshot.data();
                if (password.trim() === respData.password) {
                  Snackbar.show({
                    text: 'Login successfull',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: colors.primaryGreen,
                    textColor: colors.white,
                  });
                  //data passing to redux//
                  dispatch(
                    login({
                      userId: documentSnapshot.id,
                      firstName: respData.firstName,
                      lastName: respData.lastName,
                      email: respData.email,
                      mobileNumber: respData.mobilenumber,
                      profileImage: respData.profileimage,
                    }),
                  );
                  navigation.navigate('MyDrawer');
                } else {
                  Snackbar.show({
                    text: 'The password you entered is wrong',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: colors.red,
                    textColor: colors.white,
                  });
                }
              });
            }
          })
          .catch(err => console.warn(err));
      } else {
        Snackbar.show({
          text: 'Enter a valid email',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.red,
          textColor: colors.white,
        });
      }
    } else {
      Snackbar.show({
        text: 'Fill up the fields to continue',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };
  const handleGoToSignUp = () => {
    navigation.navigate('SignUp');
  };
  const handleGoToLoginPhone = () => {
    navigation.navigate('LogInPhone');
  };
  //signup with google//
  const handleButtonPress = () => {};

  //phone number authentication//
  function onAuthStateChanged(user) {
    //console.warn('onauth',user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    return (cleanUp = () => {});
  }, []);

  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={responsiveStyle.topBg}
      />
      <ScrollView
        style={responsiveStyle.ScrollView}
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={responsiveStyle.logo}
        />
        <Text style={responsiveStyle.loginText}>Login Account</Text>
        <CustomTextInput
          placeholder="Email Address"
          type="email"
          handleText={text => setEmail(text)}
        />
        <CustomTextInput
          placeholder="Password"
          type="password"
          handleText={text => setPassword(text)}
        />
        <CustomButton
          type="primary"
          handleButtonPress={handleLogin}
          buttonText={'Sign In'}
        />
        <Text onPress={handleGoToSignUp} style={responsiveStyle.createNew}>
          If you are new, Create Here
        </Text>
        <View style={responsiveStyle.dottedLineContainer}>
          <View style={responsiveStyle.overflow}>
            <View style={responsiveStyle.dashedLine} />
          </View>
          <View style={responsiveStyle.textContainer}>
            <Text style={responsiveStyle.dashedText}>Or Login With</Text>
          </View>
        </View>

        <CustomButton
          type="secondary"
          handleButtonPress={handleGoToLoginPhone}
          buttonText={'Sign In with Phone'}
          icon={require('../../assets/images/phone.png')}
        />
        <CustomButton
          type="secondary"
          handleButtonPress={handleButtonPress}
          buttonText={'Sign In with Google'}
          icon={require('../../assets/images/google.png')}
        />
      </ScrollView>
      <View style={responsiveStyle.footer}>
        <Text style={responsiveStyle.footerText}>Login in as a Guest</Text>
      </View>
    </View>
  );
};
export default Login;

//function handle loginil nammal login setup cheyyunnu 'snapshotil' nammal enter cheyyunna databasile data undakum
//athum pagile password thammil compare cheyth ready anenkil login akum allenkil error kanikkum
//page responsive ayi kittan stylin pakaram responsive style koduthu//
