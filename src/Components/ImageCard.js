import React,{useEffect,useState} from "react";
import items from "../items";
import { useContext } from "react";
import CartContext from "../CartContext";
const ImageCard = () => {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedSize,setSelectedSize] = useState('');
    const {addToCart} = useContext(CartContext);
    useEffect(()=>{
        setProducts(items);
        setLoading(false);
    },[]);

    const handleClick = (size,item)=>{
        setSelectedSize(size);
        addToCart(item,size);
    }

    if(loading) return <h3 className='heading'>Loading....</h3>
    return (
        products.map((item)=>{
            return (
                <div className="box" key={item.id}>
                    <div className="tag"><small></small></div>
                    <div className="image-box">
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageTwo} alt={item.imageTwo} className="imageTwo" />

                        <div className="quick-add">
                            <div className="quick-add-top">
                                <h3 className="heading">Quick Add +</h3>
                            </div>

                            <div className="quick-add-bottom">
                                {item.sizes.map((size,i)=>{
                                    return (<div className="size"><small className={`${size.size === selectedSize ? 'sizeActive' : ''}`} onClick={()=>handleClick(size.size,item)}>{size.size}</small></div>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="text">
                        <h3 className="heading">{item.name}</h3>
                        <p className="paragraph">{item.color}</p>
                        <p className="paragraph">${item.price}</p>
                    </div>

                    <div className="size-box">
                        {item.sizes.map((size,i)=>{
                            return (<div className="size"><small>{size.size}</small></div>)
                        })}
                    </div>

                    <div className="images-box">
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />

                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                        <img src={item.imageOne} alt={item.imageOne} className="imageOne" />
                    </div>
                </div>
            )
        })
        
    );
}
 
export default ImageCard;