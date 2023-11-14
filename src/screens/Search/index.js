import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import style from './style';
import CustomSearch from '../../components/CustomSearch';
import OfferProducts from '../../components/OfferProducts';
import Trending from './components';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import {useNavigation} from '@react-navigation/native';
const Search = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft/>,
    });
  }, []);
  return (
    <View style={style.main}>
      <ScrollView
        style={style.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <Trending />
        <OfferProducts />
      </ScrollView>
    </View>
  );
};

export default Search;
