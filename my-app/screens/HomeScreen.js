import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { saveItems, loadItems } from '../Storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    { id: '1', name: 'Reversible Angora Cardigan', price: 120, icon: require('../assets/dress1.png') },
    { id: '2', name: 'Recycle Boucle Knit Cardigan', price: 120, icon: require('../assets/dress2.png') },
    { id: '3', name: 'Classic Linen Shirt', price: 80, icon: require('../assets/dress3.png') },
    { id: '4', name: 'Cashmere Sweater', price: 200, icon: require('../assets/dress4.png') },
    { id: '5', name: 'Silk Blouse', price: 150, icon: require('../assets/dress5.png') },
    { id: '6', name: 'Leather Jacket', price: 300, icon: require('../assets/dress6.png') },
    { id: '7', name: 'Wool Coat', price: 250, icon: require('../assets/dress7.png') },
    { id: '8', name: 'Cotton T-Shirt', price: 50, icon: require('../assets/dress7.png') },
  ]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedItems = await loadItems();
      setCart(savedItems);
    };

    loadCart();
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    saveItems(updatedCart);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ImageBackground source={item.icon} style={styles.itemImage} resizeMode='contain'>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
          <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </ImageBackground>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={[styles.itemText, styles.itemPrice]}>${item.price}</Text>
    </View>
  );

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Menu.png')} />
        <Image source={require('../assets/Logo.png')} />
        <View style={styles.headerIcons}>
          <Image source={require('../assets/Search.png')} />
          <Image source={require('../assets/shoppingBag.png')} />
        </View>
      </View>

      <View style={styles.storyHeader}>
        <Text style={styles.storyText}>OUR STORY</Text>
        <View style={styles.storyIcons}>
          <Image source={require('../assets/Listview.png')} />
          <Image source={require('../assets/Filter.png')} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.productContainer}>
          {products.map((item) => renderItem({ item }))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  storyText: {
    fontSize: 32,
  },
  storyIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: (screenWidth / 2) - 24, // Adjusted for padding and margin
    marginBottom: 16,
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 300,  // Increased height for better visibility
    justifyContent: 'flex-end',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 5,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
  itemText: {
    textAlign: 'center',
    marginTop: 5,
  },
  itemPrice: {
    color: 'orange',  // Changed color to orange
  },
  cartButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
