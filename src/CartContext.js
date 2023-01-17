import {useState,createContext} from "react";
const CartContext = createContext();

export function CartProvider({children}){
    const [items,setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToCart = (item,size)=>{
        setItems([...items, {...item, total: item.price,size}]);
        calculateTotalPrice();
    };

    const increaseQuantity = (itemId) => {
        setItems(
            items.map((item) => {
            if (item.id === itemId) {
              return { ...item, qty: item.qty + 1, total:((item.qty + 1)  * item.price) };
            }
            return item;
          })
        );
        calculateTotalPrice();
    };

    const reduceQuantity = (itemId) => {
        setItems(
            items.map((item) => {
            if (item.id === itemId) {
                if(item.qty  === 0){
                    console.log(item.qty);
                    removeFromCart(itemId);
                    return item;
                }
                else{
                    return { ...item, qty: item.qty - 1,total:((item.qty - 1) * item.price) };
                }
            }
            return item;
          })
        );
        calculateTotalPrice();
    };

    const removeFromCart = (itemId)=>{
        setItems(items.filter((item) => item.id !== itemId));
        calculateTotalPrice();
    };

    const calculateTotalPrice = () => {
        let total = 0;
        items.forEach((item) => {
            total += item.price;
        });
        setTotalPrice(total);
    };

    return(
        <CartContext.Provider value={{items,addToCart,removeFromCart,increaseQuantity,reduceQuantity,totalPrice}}>{children}</CartContext.Provider>
    )
}

export default CartContext;