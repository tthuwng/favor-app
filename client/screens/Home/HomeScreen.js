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
import { RecipeCard } from '../../AppStyles';

import { IconButton } from '../../components';
import Firebase from '../../config/firebase';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import {
  getCategoryName,
  getRecipesByRecipeName,
  getRecipesByCategoryName,
  getRecipesByIngredientName,
} from '../../data/MockDataAPI';
import { recipes } from '../../data/dataArrays';
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
    var recipeArray1 = getRecipesByRecipeName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var recipeArray3 = getRecipesByIngredientName(text);
    var aux = recipeArray1.concat(recipeArray2);
    var recipeArray = [...new Set(aux)];

    if (text == '') {
      setData([]);
    } else {
      setData(recipeArray);
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate('Favor', { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor='rgba(73,182,77,0.9)'
      onPress={() => onPressRecipe(item)}
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
          data={recipes}
          renderItem={renderRecipes}
          keyExtractor={(item) => `${item.recipeId}`}
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
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#222',
  },
});
