import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDimensionContext} from '../../context';
import style from './style';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import colors from '../../components/common/colors';
import {
  validateEmail,
  validatePhoneNumber,
} from '../../components/common/validations';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../storage/action';
import {updateProfileImage} from './controller';

const Account = () => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  //to select data from redux and display user information to profile form//
  const {userId, firstName, lastName, email, mobileNumber, profileImage} =
    useSelector(state => state);

  const [fName, setFname] = useState(firstName);
  const [lname, setLname] = useState(lastName);
  const [phone, setPhone] = useState(mobileNumber);
  const [StateEmail, setEmail] = useState(email);
  const [modal, setModal] = useState(false);
  const [modalChoose, setModalChoose] = useState(false);
  const [userImage, setUserImage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);

  //function to call modal and highlight image //
  const handleOpenImage = () => {
    setModal(!modal);
  };

  const handleEditImage = () => {
    setModalChoose(true);
  };
  //function to select profile image from gallery//
  const handlePickFromGallery = () => {
    //setModalChoose(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        //to set image path and display selected gallery image on profile edit//
        setUserImage(image.path || '');
        setModalChoose(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //function to select profile image using camera//
  const handleFromCamera = () => {
    setModalChoose(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.warn(image);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleUpdateProfile = async () => {
    if (validatePhoneNumber(phone.trim())) {
      if (validateEmail(StateEmail.trim())) {
        if (fName !== '' && lname !== '') {
          let newUrl = profileImage;
          //to get profile image from firebase//
          if (userImage !== '') {
            newUrl = await updateProfileImage(userImage);
          }

          //to call user profile image from firestore//
          //when we edit our details on form details updated//
          await firestore()
            .collection('User')
            .doc(userId)
            .update({
              firstName: fName,
              lastName: lname,
              email: StateEmail,
              mobilenumber: phone,
              profileimage: newUrl,
            })
            //data passing to redux to update profie details//
            .then(() => {
              dispatch(
                updateProfile({
                  firstName: fName,
                  lastName: lname,
                  email: StateEmail,
                  mobilenumber: phone,
                  profileImage: newUrl,
                }),
              );
              setUserImage('');
              Snackbar.show({
                text: 'Profile is updated',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
              });
            });
        } else {
          Snackbar.show({
            text: 'Fill up all the fields to continue',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        }
      } else {
        Snackbar.show({
          text: 'Given email address is not valid',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.red,
          textColor: colors.white,
        });
      }
    } else {
      Snackbar.show({
        text: 'Given phone number is not valid',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={responsiveStyle.container}>
      <Text style={responsiveStyle.head}>
        {firstName}
        {''}
        {lastName}
      </Text>
      <View style={responsiveStyle.userImage}>
        <TouchableOpacity onPress={handleOpenImage}>
          {/*TO SET FIREBASE PROFILE*/}
          <Image
            source={
              userImage === ''
                ? profileImage === ''
                  ? require('../../assets/images/dummy.jpg')
                  : {uri: profileImage}
                : {uri: userImage}
            }
            style={responsiveStyle.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={responsiveStyle.editTouch}
          onPress={handleEditImage}>
          <Image
            source={require('../../assets/images/edit-green.png')}
            style={responsiveStyle.edit}
          />
        </TouchableOpacity>
      </View>
      <CustomTextInput
        value={fName}
        placeholder="First Name"
        handleText={text => setFname(text)}
      />
      <CustomTextInput
        placeholder="Last Name"
        value={lname}
        handleText={text => setLname(text)}
      />
      <CustomTextInput
        type="email"
        value={StateEmail}
        placeholder="Email Address"
        handleText={text => setEmail(text)}
      />
      <CustomTextInput
        placeholder="Mobile Number"
        value={phone}
        handleText={text => setPhone(text)}
      />

      <CustomButton
        type="primary"
        handleButtonPress={handleUpdateProfile}
        buttonText={'Update Profile'}
      />

      <Modal visible={modal} onRequestClose={() => setModal(false)} transparent>
        <View style={responsiveStyle.modalBack}>
          <View>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={responsiveStyle.close}>
              <Image
                source={require('../../assets/images/close.png')}
                style={responsiveStyle.edit}
              />
            </TouchableOpacity>

            <Image
              source={
                profileImage === ''
                  ? require('../../assets/images/dummy.jpg')
                  : {uri: profileImage}
              }
              style={responsiveStyle.bigImage}
            />
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalChoose}
        onRequestClose={() => setModalChoose(false)}
        transparent>
        <View style={responsiveStyle.modalBack}>
          <View style={responsiveStyle.selectBox}>
            <TouchableOpacity
              onPress={() => setModalChoose(false)}
              style={responsiveStyle.closeChoose}>
              <Image
                source={require('../../assets/images/close.png')}
                style={responsiveStyle.edit}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={responsiveStyle.touch}
              onPress={handlePickFromGallery}>
              <Text style={responsiveStyle.pickText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={responsiveStyle.touch}
              onPress={handleFromCamera}>
              <Text style={responsiveStyle.pickText}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Account;
