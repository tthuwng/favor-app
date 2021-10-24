import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home/HomeScreen';
import FavorScreen from '../screens/Favor/FavorScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Home' component={HomeScreen} />
      {/* <Stack.Screen name='Categories' component={CategoriesScreen} /> */}
      <Stack.Screen name='Favor' component={FavorScreen} />
      {/* <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='Search' component={SearchScreen} /> */}
      {/* <Stack.Screen
        name='IngredientsDetails'
        component={IngredientsDetailsScreen}
      /> */}
    </Stack.Navigator>
  );
}
