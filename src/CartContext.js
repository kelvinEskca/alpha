import {useState,createContext,useEffect} from "react";
const CartContext = createContext();

export function CartProvider({children}){
    const loadCartFromLocalStorage = () =>{
        try {
            const cart = JSON.parse(localStorage.getItem('cart'));
            if (cart) {
              return cart;
            }
          } catch (err) {
            console.error(err);
          }
        return [];
    }

    const saveCartToLocalStorage = (items) => {
        try {
          localStorage.setItem('cart', JSON.stringify(items));
        } catch (err) {
          console.error(err);
        }
    }

    const [items,setItems] = useState(() => loadCartFromLocalStorage());

    useEffect(() => {
        saveCartToLocalStorage(items);
    }, [items]);

   
    const addToCart = (item) => {
        setItems(prevCart => [...prevCart, item]);
    }
    
    const increaseQuantity = (itemId) => {
        setItems(prevCart => prevCart.map(item => 
            item.id === itemId ? {...item, qty: item.qty + 1} : item
        ))
    }
    
    const reduceQuantity = (itemId) => {
        setItems(prevCart => prevCart.map(item => {
            if (item.id === itemId) {
              if (item.qty > 1) {
                return { ...item, qty: item.qty - 1 }
              } else {
                return null;
              }
            } else {
              return item;
            }
        }).filter(item => item !== null))
    }
    
    const removeFromCart = (itemId) => {
        setItems(prevCart => prevCart.filter(item => item.id !== itemId))
    }

    const getTotalAmount = () => {
        return items.reduce((acc, item) => acc + item.price * item.qty, 0)
    }

    const getItemAmount = () => {
        return items.map(item => item.price * item.qty);
    }


    return(
        <CartContext.Provider value={{items,addToCart,removeFromCart,increaseQuantity,reduceQuantity,getTotalAmount,getItemAmount}}>{children}</CartContext.Provider>
    )
}

export default CartContext;