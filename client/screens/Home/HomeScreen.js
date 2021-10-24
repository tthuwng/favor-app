import { StatusBar } from 'expo-status-bar';
import React, { useContext, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import { FavorCard } from '../../AppStyles';

import { IconButton } from '../../components';
import Firebase from '../../config/firebase';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import {
  getCategoryName,
  getFavorsByFavorName,
  getFavorsByCategoryName,
  getFavorsByIngredientName,
} from '../../data/MockDataAPI';
import { favors } from '../../data/dataArrays';
// import MenuImage from '../../components/MenuImage';

const auth = Firebase.auth();

export default function HomeScreen(props) {
  const { user } = useContext(AuthenticatedUserContext);
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: () => (
      //   <MenuImage
      //     onPress={() => {
      //       navigation.openDrawer();
      //     }}
      //   />
      // ),
      headerRight: () => <View />,
    });
  }, []);

  const handleSearch = (text) => {
    setValue(text);
    var favorArray1 = getFavorsByFavorName(text);
    var favorArray2 = getFavorsByCategoryName(text);
    var favorArray3 = getFavorsByIngredientName(text);
    var aux = favorArray1.concat(favorArray2);
    var favorArray = [...new Set(aux)];

    if (text == '') {
      setData([]);
    } else {
      setData(favorArray);
    }
  };

  const onPressFavor = (item) => {
    navigation.navigate('Favor', { item });
  };

  const renderFavors = ({ item }) => (
    <TouchableHighlight
      underlayColor='rgba(73,182,77,0.9)'
      onPress={() => onPressFavor(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <Text style={styles.title}>Do a Favor!</Text>

        <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        />
      </View>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require('../../assets/icons/search.png')}
        />
        <TextInput
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={value}
        />
        <Pressable onPress={() => handleSearch('')}>
          <Image
            style={styles.searchIcon}
            source={require('../../assets/icons/close.png')}
          />
        </Pressable>
      </View>

      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={favors}
          renderItem={renderFavors}
          keyExtractor={(item) => `${item.favorId}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  searchContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    width: 300,
    marginBottom: 24,
    justifyContent: 'space-around',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  searchInput: {
    backgroundColor: '#EDEDED',
    color: 'black',
    width: 200,
    height: 50,
  },
  photo: FavorCard.photo,
  title: FavorCard.title,
  category: FavorCard.category,
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#222',
  },
});
