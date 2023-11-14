import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomSearch from '../../components/CustomSearch';
import style from './style';
import {useDimensionContext} from '../../context';
import firestore from '@react-native-firebase/firestore';
import colors from '../../components/common/colors';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const Categories = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.windowWidth, dimension.windowHeight);
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);

  //select categories details from redux//
  const categories = useSelector(state => state.categories);
  const {catIndex = 0} = route?.params ?? {};
  //to get correct category//
  useEffect(() => {
    setActive(catIndex);
  }, [catIndex]);

  //call api from database and display//
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });

    getProducts();
  }, []);

  //call api from firebase and display products eg lemon/apple//
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
          setProducts(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //function to touch the image and display data//
  const handleCategoryTouch = index => {
    setActive(index);
  };
  //function to navigate 'productdetails' page and display product details//
  const handleProduct = item => {
    navigation.navigate('ProductDetails', {product: item});
  };
  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <View style={responsiveStyle.rowStyle}>
          {/*sidebar*/}
          <View>
            <FlatList
              data={categories}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={responsiveStyle.catFlatStyle}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      responsiveStyle.catTouch,
                      {
                        backgroundColor:
                          index === active ? colors.white : 'transparent',
                      },
                    ]}
                    onPress={() => handleCategoryTouch(index)}>
                    <Image
                      source={{uri: item.image}}
                      style={responsiveStyle.catImage}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/*content*/}
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={require('../../assets/images/home1bg.jpg')}
              style={responsiveStyle.backImage}>
              <Text style={responsiveStyle.catName} numberOfLines={1}>
                {categories[active]?.name}
              </Text>
              <Text style={responsiveStyle.catDesc} numberOfLines={3}>
                {categories[active]?.description}
              </Text>
            </ImageBackground>
            <FlatList
              data={products}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={responsiveStyle.proStyle}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleProduct(item)}
                    style={responsiveStyle.proContainer}>
                    <View style={responsiveStyle.imageBg}>
                      <Image
                        source={{uri: item.image}}
                        style={responsiveStyle.proImage}
                      />
                    </View>
                    <Text style={responsiveStyle.proName}>{item.name}</Text>
                    <Text style={responsiveStyle.proDesc}> ₹ {item.price}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;

