import { Text } from 'react-native';
import React, { Component } from 'react';
import { favors, categories, ingredients } from './dataArrays';

export function getCategoryById(categoryId) {
  let category;
  categories.map((data) => {
    if (data.id == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getIngredientName(ingredientID) {
  let name;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}

export function getIngredientUrl(ingredientID) {
  let url;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}

export function getCategoryName(categoryId) {
  let name;
  categories.map((data) => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}

export function getFavors(categoryId) {
  const favorsArray = [];
  favors.map((data) => {
    if (data.categoryId == categoryId) {
      favorsArray.push(data);
    }
  });
  return favorsArray;
}

// modifica
export function getFavorsByIngredient(ingredientId) {
  const favorsArray = [];
  favors.map((data) => {
    data.ingredients.map((index) => {
      if (index[0] == ingredientId) {
        favorsArray.push(data);
      }
    });
  });
  return favorsArray;
}

export function getNumberOfFavors(categoryId) {
  let count = 0;
  favors.map((data) => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllIngredients(idArray) {
  const ingredientsArray = [];
  idArray.map((index) => {
    ingredients.map((data) => {
      if (data.ingredientId == index[0]) {
        ingredientsArray.push([data, index[1]]);
      }
    });
  });
  return ingredientsArray;
}

// functions for search
export function getFavorsByIngredientName(ingredientName) {
  const nameUpper = ingredientName.toUpperCase();
  const favorsArray = [];
  ingredients.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      // data.name.yoUpperCase() == nameUpper
      const favors = getFavorsByIngredient(data.ingredientId);
      const unique = [...new Set(favors)];
      unique.map((item) => {
        favorsArray.push(item);
      });
    }
  });
  const uniqueArray = [...new Set(favorsArray)];
  return uniqueArray;
}

export function getFavorsByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const favorsArray = [];
  categories.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const favors = getFavors(data.id); // return a vector of favors
      favors.map((item) => {
        favorsArray.push(item);
      });
    }
  });
  return favorsArray;
}

export function getFavorsByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const favorsArray = [];
  favors.map((data) => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      favorsArray.push(data);
    }
  });
  return favorsArray;
}
