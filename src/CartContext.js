import {useState,createContext} from "react";
const CartContext = createContext();

export function CartProvider({children}){
    const [items,setItems] = useState([]);

    const addToCart = (item)=>{
        setItems((prevState) => [...prevState, item])
    };

    const removeFromCart = (item)=>{
        setItems((prevState) => console.log(prevState))
    }
    return(
        <CartContext.Provider value={{items,addToCart,removeFromCart}}>{children}</CartContext.Provider>
    )
}

export default CartContext;