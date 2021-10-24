import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const favorNumColums = 2;
// item size
const FAVOR_ITEM_HEIGHT = 150;
const FAVOR_ITEM_MARGIN = 20;

// 2 photos per width
export const FavorCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: FAVOR_ITEM_MARGIN,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (favorNumColums + 1) * FAVOR_ITEM_MARGIN) /
      favorNumColums,
    height: FAVOR_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (favorNumColums + 1) * FAVOR_ITEM_MARGIN) /
      favorNumColums,
    height: FAVOR_ITEM_HEIGHT,
    borderRadius: 15,
    resizeMode: 'contain',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5,
  },
});
