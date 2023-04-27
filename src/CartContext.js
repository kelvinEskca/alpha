import {useState,createContext,useEffect} from "react";
const CartContext = createContext();

export function CartProvider({children}){
  const loadCartFromLocalStorage = () =>{
    try {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart) {
        return cart;
      }
    } 
    catch (err) {
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
    console.log(item);
    const index = items.findIndex(
      (i) => i.name === item.name && i.size === item.size && i.color === item.color
    );
    if (index !== -1) {
      const newItems = [...items];
      newItems[index].qty += item.qty;
      setItems(newItems);
    } else {
      setItems((prevCart) => [...prevCart, { ...item }]);
    }
  };
  
  const increaseQuantity = (itemId,color,size) => {
    setItems(prevCart => prevCart.map(item => {
      if (item._id === itemId && item.size === size && item.color === color) {
        return { ...item, qty: item.qty + 1 };
      } else {
        return item;
      }
    }));
    console.log(color,size);
  }
  
  const reduceQuantity = (itemId,color,size) => {
    setItems(prevCart => prevCart.map(item => {
      if (item._id === itemId && item.size === size && item.color === color) {
        if (item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        } else {
          return null;
        }
      } else {
        return item;
      }
    }).filter(item => item !== null));
  }
  
  const removeFromCart = (itemId, color, size) => {
    setItems(prevCart =>
      prevCart.filter(
        item =>
          item._id !== itemId ||
          item.color !== color ||
          item.size !== size
      )
    );
  };
  

  const getTotalAmount = () => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0)
  }

  const getShipping = () => {
    const totalQty = items.reduce((acc, item) => acc + item.qty, 0);
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    let shippingFee = 0;
    if (totalQty > 10) {
      shippingFee = 25;
    } else {
      shippingFee = 15;
    }

    const totalAmount = subtotal + shippingFee;

    return totalAmount;
  };

  const getItemAmount = () => {
    return items.map(item => item.price * item.qty);
  }

  return(
    <CartContext.Provider value={{items,addToCart,removeFromCart,increaseQuantity,reduceQuantity,getTotalAmount,getItemAmount,getShipping}}>{children}</CartContext.Provider>
  )
}

export default CartContext;