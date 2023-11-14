import React, {useState} from 'react';
import {
  Image,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import style from './style';
import colors from '../common/colors';
import {useDimensionContext} from '../../context';
const CustomTextInput = props => {
  const {
    type,
    handleText,
    placeholder,
    value,
    check = false,
    multiline = false,
  } = props;
  const dimensions = useDimensionContext();

  const [show, setShow] = useState(false);
  const keyboardType =
    type === 'email'
      ? 'email-address'
      : type === 'password'
      ? 'default'
      : type === 'phone'
      ? 'phone-pad'
      : 'default';
  const SecureTextEntry = type === 'password' ? (show ? false : true) : false;
  const icon =
    type === 'email'
      ? require('../../assets/images/email.png')
      : type === 'password'
      ? show
        ? require('../../assets/images/view.png')
        : require('../../assets/images/hide.png')
      : false;
  const handlePassword = () => {
    setShow(!show);
  };
  return (
    <View style={style.container}>
      <TextInput
        style={[
          style.textInput,
          {
            height:
             Platform.OS === 'android'
                ? dimensions.Windowheight
              : dimensions.Windowheight
        },
        ]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={SecureTextEntry}
        selectionColor={colors.primaryGreen}
        placeholderTextColor={colors.gray}
        onChangeText={handleText}
        value={value}
        multiline={multiline}
      />
      {check ? <Text style={style.checkText}>Check</Text> : null}
      {!icon ? null : (
        <TouchableOpacity
          onPress={handlePassword}
          disabled={type !== 'password' ? true : false}>
          <Image source={icon} style={style.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default CustomTextInput;
