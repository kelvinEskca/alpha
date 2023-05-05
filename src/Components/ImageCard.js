import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../CartContext";
import axios from "axios";
import Loader from "./Loader";
import SlideShow from "../Components/SlideShow";
import AlertModal from "./AlertModal";
import baseUrl from "../config/config.js";
const ImageCard = ({toggleState}) => {
    axios.defaults.withCredentials = true;
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState({});
    const {addToCart} = useContext(CartContext);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    useEffect(()=>{
        if(toggleState === 1){
            const gender = 'Female';
            const getproducts = async ()=>{
                try{
                    const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product/female/${gender}`);
                    setProducts(res.data);
                    if(res){
                        setLoading(false);
                    }
                    else{
                        setLoading(false);
                    }
                   
                }
                catch(err){
                    console.log(err);
                }
            }
            getproducts();
        }
        else if(toggleState === 2){
            const gender = 'Male';
            const getproducts = async ()=>{
                try{
                    const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product/male/${gender}`)
                    setProducts(res.data);
                    if(res){
                        setLoading(false);
                    }
                    else{
                        setLoading(false);
                    }
                }
                catch(err){
                    console.log(err);
                }
            }
            getproducts();
        }
        else{
            const getproducts = async ()=>{
                try{
                    const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product`)
                    setProducts(res.data);
                    if(res){
                        setLoading(false);
                    }
                    else{
                        setLoading(false);
                    }
                }
                catch(err){
                    console.log(err);
                }
            }
            getproducts();
        }
        
    },[toggleState]);

    const handleClick = (item,size) => {
        setSelectedSizes({...selectedSizes, [item._id]: size });
        addToCart({...item,size});
        setIsSuccessModalOpen(true);
        setAlertText("Item added to cart!");
        setTimeout(() => {
            setIsSuccessModalOpen(false);
        }, 5000);
    };
    
    let url = []; 
    const makePic = (item) =>{
        url.push(item);
        console.log(item)
    }

    if(loading) return <Loader />
    return (
        <>
        {products.length > 0 ? (
            products.map((item,i)=>{
                if (item.inStock === true){
                    const {image} = item;   
                                    
                    image.map((img)=>{
                        return url.push(img.url);
                    })
                    return (
                        <div className="box" key={i}>
                            <div className="tag"><small></small></div>
                            <div className="image-box">
                                <Link to={`details/${item._id}`}>
                                    <SlideShow url={url} />
                                </Link>
        
                                <div className="quick-add">
                                    <div className="quick-add-top">
                                        <h3 className="heading">Quick Add +</h3>
                                    </div>
        
                                    <div className="quick-add-bottom">
                                        {item.sizes.map((size,i)=>{
                                            return (<div className="size" key={i}><small className={`${
                                                size === selectedSizes[item._id] ? 'sizeActive' : ''
                                            }`} onClick={()=>handleClick(item,size)}>{size}</small></div>)
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
                                    return (<div className="size" key={i}><small className={`${
                                        size === selectedSizes[item._id] ? 'sizeActive' : ''
                                    }`} onClick={()=>handleClick(item,size)}>{size}</small></div>)
                                })}
                            </div>

                            <div className="image-scroll">
                                {item.image.map((pic,i)=>{
                                    return(
                                        <>
                                            <img src={pic.url} alt={item.name} onClick={()=>makePic(pic.url)}/>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }
                return null
            })
        ):(<h3>No Products</h3>)}

        <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
        </>
    );
}
 
export default ImageCard;