import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import firestore from '@react-native-firebase/firestore';
import {useDimensionContext} from '../../../context';
import colors from '../../../components/common/colors';
import { useSelector } from 'react-redux';
const Trending = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  //get categories information from redux//
 const categories=useSelector(state=>state.categories)

  return (
    <View style={responsiveStyle.main}>
      <Text style={responsiveStyle.title}>Trending Category</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={responsiveStyle.flatList}
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
          return <View style={[responsiveStyle.imageCon ,{backgroundColor:categoriesColor}]}>
            <Image source={{uri:item.image}} style={responsiveStyle.image} />
          </View>;
        }}
      />
    </View>
  );
};

export default Trending;
