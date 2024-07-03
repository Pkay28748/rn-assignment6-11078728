import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
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
    <View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <Button title="Remove from Cart" onPress={() => removeFromCart(item)} />
          </View>
        )}
      />
      <Text>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</Text>
    </View>
  );
};

export default CartScreen;
