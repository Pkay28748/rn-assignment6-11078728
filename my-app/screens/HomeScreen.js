import React, {useSate, useEffect} from 'react';
import { View,Text,Button,FlatList } from 'react-native';
import {saveItems, loadItems} from '../Storage';



const HomeScreen = ({naviagtion})=>{
    const [ products, setProducts]= useSate([
        { id: '1', name: 'Reversible Angora Cardigan', price: 120 },
        { id: '2', name: 'Recycle Boucle Knit Cardigan', price: 120 },  
    ]);



const [cart , setCart]=useSate([]);

useEffect(()=>{
    const loadCart = async()=>{
       const savedItems = await loadItems();
       setCart(savedItems)
    };

loadCart(); },
[]);

const addToCart = (product)=>{
    const updatedcart = [...cart,product];
    setCart(updatedcart)
    saveItems(updatedcart);
};

return (
    <View>
        <FlatList
            data={products}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
               <View>
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
                <Button title='Add to Cart' onPress={()=>addToCart(item)}/> 
                </View>
            )}
            />
        <Button title='Go to Cart' onPress={()=>naviagtion.navigate('Cart')}/>
    </View>

        );
    };

export default HomeScreen;
