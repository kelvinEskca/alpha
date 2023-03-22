import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";
import axios from "axios";
import SlideShow from "../Components/SlideShow";
import AlertModal from "./AlertModal";
import { useContext } from "react";
import CartContext from "../CartContext";
import baseUrl from "../config/config.js";
const Search = ({search}) => {
    axios.defaults.withCredentials = true;
    const [filtered,setfiltered] = useState('');
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState({});
    const {addToCart} = useContext(CartContext);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    useEffect(()=>{
        const getproducts = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product`)
                setProducts(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getproducts();
    },[]);

    const searchFunction = async (e) => {
        setLoading(false);
        e.preventDefault();
        const key = e.target.value;
        const newFilter = products.filter((value)=>{
            return value.name.toLowerCase().includes(key.toLowerCase());
        });

        if(key === ""){
            setfiltered([]);
            setLoading(false);
        }
        else{
            setfiltered(newFilter);
            setLoading(true);
        }
    };
    const handleClick = (item,size) => {
        setSelectedSizes({...selectedSizes, [item._id]: size });
        addToCart({...item,size});
        setIsSuccessModalOpen(true);
        setAlertText("Item added to cart!");
        setTimeout(() => {
            setIsSuccessModalOpen(false);
        }, 5000);
    };
    return (
        <div className={`${search ? ("search-on") : ("search-off")}`}>
            <div className="mobile-inner">
                <div className="top">
                   <label htmlFor="search"><input type="search" placeholder="Search Products" onChange={searchFunction} autoComplete="off"/></label>
                </div>

                {loading ? (
                    <div className="center search-center">
                        <h3 className="heading">Products</h3>
                        <section className="section new">
                            <div className="wrapper">
                                <div className="boxes">
                                    {filtered.map((item,i)=>{
                                        if (item.inStock === true){
                                            const {image} = item;   
                                            let url = [];                 
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
                                                </div>
                                            )
                                        }
                                        return null
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="center search-center">
                        <h3 className="heading">Trending Products</h3>
                        <section className="section new">
                            <div className="wrapper">
                                <div className="boxes">
                                    <ImageCard/>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
            </div>
        </div>
    );
}
 
export default Search;