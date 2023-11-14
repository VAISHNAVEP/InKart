import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import style from './style';
import {useDimensionContext} from '../../../../context';

const Banner = () => {
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.windowWidth, dimension.windowHeight);

  const [bannerItems, setBannerItems] = useState([]);
  //call api from firebase to display banner images//
  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    await firestore()
      .collection('Banners')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          //console.log(snapshot.docs);
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              result.push(doc.data());
            }
          });
          setBannerItems(result);
        }
      })
      .catch(err=>{
        console.log(err);
      })
  };

  return (
    <View>
      <FlatList
        data={bannerItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index)=>String(index)}
        renderItem={({item, index}) => {
          return (
            <ImageBackground
              source={{uri: item.image}}
              style={responsiveStyle.banner}>
              <View style={responsiveStyle.innerView}>
                <Text style={responsiveStyle.head}>{item.head}</Text>
                <Text style={responsiveStyle.content}>{item.description}</Text>
                <TouchableOpacity style={responsiveStyle.touch}>
                  <Text style={responsiveStyle.touchText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

export default Banner;
//'snapshot.docs' ane serveril ninnulla data undavuka//
