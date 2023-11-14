import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDimensionContext} from '../../../../context';
import style from './style';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
const RecentBought = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const [recentItems, setRecentItems] = useState([]);
  const navigation = useNavigation();
  //call api from firestore and display the data//
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              result.push(doc.data());
            }
          });
          setRecentItems(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleProduct = item => {
    navigation.navigate('ProductDetails', {product: item});
  };

  return (
    <View style={responsiveStyle.container}>
      <Text style={responsiveStyle.head}>Buy from Recently Bought </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator
        keyExtractor={(item, index) => String(index)}
        data={recentItems}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => handleProduct(item)}
            style={responsiveStyle.contentView}>
            <Image source={{uri: item.image}} style={responsiveStyle.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecentBought;
