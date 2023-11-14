import {View, Text, ScrollView} from 'react-native';
import React, { useEffect, useRef } from 'react';
import style from './style';
import CommonHeader from '../../components/CommonHeader';
import CustomSearch from '../../components/CustomSearch';
import Banner from './Components/Banner';
import RecentBought from './Components/RecentBought';
import ShopCategory from './Components/ShopCategory';
import ProductScroll from '../../components/ProductScroll';
import OfferProducts from '../../components/OfferProducts';
import { useIsFocused } from '@react-navigation/native';

const Home = () => {
  const scrollRef=useRef(null);
  const isFocused=useIsFocused();
  useEffect(()=>{
    if(isFocused){
      scrollRef.current.scrollTo({y:0,animated:true})
    }

  },[isFocused])
  return (
    <View style={style.main}>
      <CommonHeader />
      <ScrollView
      ref={scrollRef}
        style={style.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <Banner />
        <RecentBought />
        <ShopCategory />
        <ProductScroll />
        <OfferProducts />

        <Text style={style.footText}>
          Didn't find what you are looking for?
        </Text>
        <View style={style.footButton}>
          <Text style={style.footButtonText}>Browse Category</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
