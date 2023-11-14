import React, {useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import style from './style';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import colors from '../../components/common/colors';
import {validateOtp, validatePhone} from './controller';
import {useDimensionContext} from '../../context';
const LogInPhone = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [showOtp, setShowOtpField] = useState(false);
  const navigation = useNavigation();
  //for apply responsive ui//
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const handleGoToLogin = () => {
    navigation.goBack();
  };
  //phone number authentication//
  const handleButtonPress = async () => {
    try {
      setError(null);
      if (validatePhone(phone.trim())) {
        const confirmation = await auth().signInWithPhoneNumber(phone);
        if (confirmation) {
          Snackbar.show({
            text: 'Verification code is send to your mobile number,please verify',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primaryGreen,
            textColor: colors.black,
          });
          setConfirm(confirmation);
          setShowOtpField(true);
        }
      } else {
        setError('Given phone number is incorrect');
      }
    } catch (error) {
      setError('Given phone number is incorrect');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.trim() !== '' && validateOtp(otp.trim())) {
      const res = await confirm.confirm(otp.trim());
      if (res) {
        Snackbar.show({
          text: 'Your phone number is verified,Login Successfull',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.primaryGreen,
          textColor: colors.black,
        });
        navigation.navigate('MyDrawer');
      }
    } else {
      setError('Given otp is invalid');
    }
  };
  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={responsiveStyle.topBg}
      />
      <ScrollView style={style.ScrollView} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={responsiveStyle.logo}
        />
        {error !== null ? (
          <View>
            <Text style={responsiveStyle.errorText}>{error}</Text>
          </View>
        ) : null}
        <Text style={responsiveStyle.loginText}>Login With Phone</Text>
        <CustomTextInput
          type="phone"
          placeholder="Phone Number"
          handleText={text => setPhone(text)}
        />
        {showOtp ? (
          <CustomTextInput
            type="phone"
            placeholder="Enter Otp"
            handleText={text => setOtp(text)}
          />
        ) : null}
        <CustomButton
          type="primary"
          handleButtonPress={showOtp ? handleVerifyOtp : handleButtonPress}
          buttonText={showOtp ? 'Verify Otp' : 'Sign In With Phone'}
        />

        <Text onPress={handleGoToLogin} style={responsiveStyle.createNew}>
          Go To Login
        </Text>
      </ScrollView>
    </View>
  );
};
export default LogInPhone;
