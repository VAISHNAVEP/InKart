import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import style from './style';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
  validateEmail,
  validatePhoneNumber,
} from '../../components/common/validations';
import Snackbar from 'react-native-snackbar';
import colors from '../../components/common/colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {validatePhone} from './controller';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  //signup using google account//
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '690546174648-qa4gb1s9uv3549gujb5kob43ngsnh43o.apps.googleusercontent.com',
    });
  }, []);
  //google button press//
  const handleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    } catch (error) {
      console.warn(error);
    }
  };

  const handleGoToLogin = () => {
    navigation.goBack();
  };

  //for data passing to firebase//
  const handleSignUp = async () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();
    const trimmedCPassword = cpassword.trim();
    const trimmedPassword = password.trim();

    if (
      trimmedUsername &&
      trimmedEmail &&
      trimmedMobile &&
      trimmedCPassword &&
      trimmedPassword
    ) {
      if (!validateEmail(trimmedEmail)) {
        return setError('Given email is not valid');
      }

      if (!validatePhoneNumber(trimmedMobile)) {
        return setError('Given mobile number is not valid');
      }

      if (trimmedPassword !== trimmedCPassword) {
        return setError('Given Passwords do not match');
      }

      const userSnapshot = await firestore()
        .collection('User')
        .where('username', '==', trimmedUsername)
        .where('email', '==', trimmedEmail)
        .get();

      if (userSnapshot.empty) {
        const userData = {
          username: trimmedUsername,
          email: trimmedEmail,
          mobilenumber: trimmedMobile,
          password: trimmedPassword,
          created: String(new Date()),
          updated: String(new Date()),
        };

        try {
          const resp = await firestore().collection('User').add(userData);
          console.warn(resp);

          Snackbar.show({
            text: 'A new account is created for you',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primaryGreen,
            textColor: colors.white,
          });

          navigation.navigate('AppDrawer');
        } catch (err) {
          console.warn(err);
        }
      } else {
        Snackbar.show({
          text: 'This email is already existing in our system, try using another one or go to login.',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.red,
          textColor: colors.white,
        });
      }
    } else {
      setError('Fill up all the fields to continue');
    }
  };

  return (
    <View style={style.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={style.topBg}
      />
      <ScrollView style={style.ScrollView} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={style.logo}
        />
        <Text style={style.loginText}>Sign Up Account</Text>

        {/*for display error*/}
        {error !== null ? (
          <View style={style.errorView}>
            <Text style={style.errorText}>{error}</Text>
          </View>
        ) : null}
        <CustomTextInput
          placeholder="username"
          handleText={text => setUsername(text)}
        />
        <CustomTextInput
          placeholder="Email Address"
          type="email"
          handleText={text => setEmail(text)}
        />
        <CustomTextInput
          placeholder="Mobile Number"
          type="phone"
          handleText={text => setMobile(text)}
        />
        <CustomTextInput
          placeholder="Password"
          type="password"
          handleText={text => setPassword(text)}
        />
        <CustomTextInput
          placeholder="Confirm Password"
          type="password"
          handleText={text => setCpassword(text)}
        />
        <CustomButton
          handleButtonPress={handleSignUp}
          type="primary"
          buttonText={'Sign Up'}
        />
        <View style={style.dottedLineContainer}>
          <View style={style.overflow}>
            <View style={style.dashedLine} />
          </View>
          <View style={style.textContainer}>
            <Text style={style.dashedText}>Or Sign up With</Text>
          </View>
        </View>
        <CustomButton
          type="secondary"
          handleButtonPress={handleButtonPress}
          buttonText={'Sign Up with Google'}
          icon={require('../../assets/images/google.png')}
        />
        <Text onPress={handleGoToLogin} style={style.createNew}>
          Go To Login
        </Text>
      </ScrollView>
    </View>
  );
};

export default SignUp;
