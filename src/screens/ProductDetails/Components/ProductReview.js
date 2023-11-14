import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDimensionContext} from '../../../context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../style';
import colors from '../../../components/common/colors';
import StarRating from 'react-native-star-rating-widget';
import { useNavigation } from '@react-navigation/native';
const ProductReview = props => {
  const {product} = props;
  const dimensions = useDimensionContext();
  const navigation=useNavigation();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [rating, setRating] = useState(3);
  const handleRedirect = () => {
    navigation.navigate('Review',{product:product});
  };
  return (
    <View style={{marginVertical: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <Text
          style={{
            color: colors.black_level_3,
            fontFamily: 'Lato-Regular',
            fontSize: 18,
          }}>
          Product Review (1)
        </Text>
        <TouchableOpacity onPress={handleRedirect}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 16,
            }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 15,
          backgroundColor: colors.lightGrey,
          borderRadius: 14,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={require('../../../assets/images/dummy.jpg')}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
              borderRadius: 25,
              overflow: 'hidden',
            }}
          />
          <View>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
                marginLeft: 10,
              }}>
              Rentric Henvork
            </Text>
            <StarRating starSize={20} rating={rating} onChange={()=>{}} />
          </View>
        </View>
        <Text
          style={{
            color: colors.black_level_3,
            fontFamily: 'Lato-Regular',
            fontSize: 16,
          }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </View>
    </View>
  );
};

export default ProductReview;
