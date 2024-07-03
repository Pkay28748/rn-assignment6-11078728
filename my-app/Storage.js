import AsyncStorage from "@react-native-async-storage/async-storage";


const saveItems = async(items)=>{
    try {
        const jsonValue = JSON.stringify(items);
        await AsyncStorage.setItem('@cart_items',jsonValue);

        
    } catch (error) {
        console.log(error);
    }
};


const loadItems= async()=>{
    try {
        const jsonValue = await AsyncStorage.getItem('@cart_items');
        return jsonValue != null? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.log(error);
    }
};