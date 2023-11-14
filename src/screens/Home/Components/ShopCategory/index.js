import {View, Text, FlatList, Image,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDimensionContext} from '../../../../context';
import style from './style';
import colors from '../../../../components/common/colors';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {updatecategories} from '../../../../storage/action';
import {useNavigation} from '@react-navigation/native';
const ShopCategory = () => {
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.Width, dimension.Height);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //call api from firebase and display data//
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    await firestore()
      .collection('Categories')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              //when we recieve 'id' because show categories in shop page id must//
              const responseData = {id: doc.id, ...doc?.data()};
              result.push(responseData);
            }
          });
          setCategories(result);

          //categories data passing to redux//
          dispatch(updatecategories(result));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  //FUNCTION TO NAVIGATE CATEGORIES//
  const handleCategories = index =>{
    navigation.navigate('Categories',{catIndex:index});
  }

  return (
    <View style={responsiveStyle.container}>
      <Text style={responsiveStyle.head}>Shop By Category</Text>
      <FlatList
        data={categories}
        contentContainerStyle={responsiveStyle.flatlist}
        keyExtractor={(item, index) => String(index)}
        numColumns={4}
        renderItem={({item, index}) => {
          const categoriesColor =
            index % 4 === 0
              ? colors.category1
              : index % 4 === 1
              ? colors.category2
              : index % 4 === 2
              ? colors.category3
              : index % 4 === 3
              ? colors.category4
              : colors.category1;
          return (
            <TouchableOpacity
              onPress={() => handleCategories(index)}
              style={responsiveStyle.innerView}>
              <View
                style={[
                  responsiveStyle.imageView,
                  {backgroundColor: categoriesColor},
                ]}>
                <Image
                  source={{uri: item.image}}
                  style={responsiveStyle.image}
                />
              </View>
              <Text style={responsiveStyle.itemName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ShopCategory;
