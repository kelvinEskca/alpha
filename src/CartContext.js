import {useState,createContext} from "react";
const CartContext = createContext();

export function CartProvider({children}){
    const [items,setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToCart = (item,size)=>{
        const updatedItems = [...items, {...item, total: item.price,size}]
        setItems(updatedItems);
        setTotalPrice(totalPrice + item.price);
        calculateTotalPrice();
    };

    const increaseQuantity = (itemId,itemData) => {
        setItems(
            items.map((item) => {
            if (item.id === itemId) {
              return { ...item, qty: item.qty + 1, total:((item.qty + 1)  * item.price) };
            }
            return item;
          })
        );
        calculateTotalPrice();
        setTotalPrice(totalPrice + itemData.price);
    };

    const removeFromCart = (itemId)=>{
        setItems(items.filter((item) => item.id !== itemId));
        calculateTotalPrice();
    };

    const reduceQuantity = (itemId,itemData) => {
        setItems(
            items.filter((item) => {
                if (item.id === itemId) {
                    if(item.qty === 1){
                        removeFromCart(itemId);
                        return false;
                    }
                    else{
                        return true;
                    }
                }
                return true;
            }).map(item => {
                if(item.id === itemId){
                    return { ...item, qty: item.qty - 1,total:((item.qty - 1) * itemData.price) };
                }
                return item;
            })
        );
        calculateTotalPrice();
        setTotalPrice(totalPrice - itemData.price);
    };

    const calculateTotalPrice = () => {
        if (items.length) {
            let total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
            setTotalPrice(total);
        }
    };

    return(
        <CartContext.Provider value={{items,addToCart,removeFromCart,increaseQuantity,reduceQuantity,totalPrice}}>{children}</CartContext.Provider>
    )
}

export default CartContext;