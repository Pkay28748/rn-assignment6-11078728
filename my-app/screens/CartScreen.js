import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { saveItems, loadItems } from '../Storage'; 

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedItems = await loadItems();
      setCart(savedItems);
    };
    loadCart();
  }, []);

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    saveItems(updatedCart);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <Button title="Remove from Cart" onPress={() => removeFromCart(item)} />
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 16,
  },
  total: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
