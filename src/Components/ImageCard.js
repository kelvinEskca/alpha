import React,{useEffect,useState} from "react";
import { useContext } from "react";
import CartContext from "../CartContext";
import axios from "axios";
const ImageCard = ({toggleState}) => {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedSize,setSelectedSize] = useState('');
    const {addToCart} = useContext(CartContext);
    useEffect(()=>{
        if(toggleState === 1){
            const gender = 'Female';
            const getproducts = async ()=>{
                try{
                    const res = await axios.get(`https://api-production-f7f8.up.railway.app/alphaapi/product/female/${gender}`)
                    setProducts(res.data);
                    setLoading(false);
                }
                catch(err){
                    console.log(err);
                }
            }
            getproducts();
            setLoading(false);
        }
        else if(toggleState === 2){
            const gender = 'Male';
            const getproducts = async ()=>{
                try{
                    const res = await axios.get(`https://api-production-f7f8.up.railway.app/alphaapi/product/male/${gender}`)
                    setProducts(res.data);
                    setLoading(false);
                }
                catch(err){
                    console.log(err);
                }
            }
            getproducts();
            setLoading(false);
        }
        else{
            const getproducts = async ()=>{
                try{
                    const res = await axios.get(`https://api-production-f7f8.up.railway.app/alphaapi/product`)
                    setProducts(res.data);
                    setLoading(false);
                }
                catch(err){
                    console.log(err);
                }
            }
            getproducts();
            setLoading(false);
        }
        
    },[toggleState]);

    const handleClick = (size,item)=>{
        setSelectedSize(size);
        addToCart({...item, size});
    }

    if(loading) return <h3 className='heading'>Loading....</h3>
    return (
        products.length > 0 ? (
            products.map((item)=>{
                return (
                    <div className="box" key={item.id}>
                        <div className="tag"><small></small></div>
                        <div className="image-box">
                            <img src={`${item.image[0].url}`} alt={item.image[0].url} className="imageOne" />
                            <img src={`${item.image[1].url}`} alt={item.image[1].url} className="imageTwo" />
    
                            <div className="quick-add">
                                <div className="quick-add-top">
                                    <h3 className="heading">Quick Add +</h3>
                                </div>
    
                                <div className="quick-add-bottom">
                                    {item.sizes.map((size,i)=>{
                                        return (<div className="size" key={i}><small className={`${size === selectedSize ? 'sizeActive' : ''}`} onClick={()=>handleClick(size,item)}>{size}</small></div>)
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
                                return (<div className="size" key={i}><small>{size}</small></div>)
                            })}
                        </div>
    
                        <div className="images-box">
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
    
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                            <img src={`${item.image[0].url}`} alt={item.image[0]} className="imageOne" />
                        </div>
                    </div>
                )
            })
        ):(<h3>No Products</h3>)
    );
}
 
export default ImageCard;