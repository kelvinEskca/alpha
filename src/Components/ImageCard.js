import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../CartContext";
import axios from "axios";
import AlertModal from "./AlertModal";
import baseUrl from "../config/config.js";
import SkeletonLoader from "./SkeletonLoader";
import 'react-loading-skeleton/dist/skeleton.css'
const ImageCard = ({toggleState}) => {
    axios.defaults.withCredentials = true;
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState({});
    const {addToCart} = useContext(CartContext);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const [selectColor, setSelectColor] = useState([]);
    const [selectColorName, setSelectColorName] = useState([]);
    const [colorId, setColorId] = useState();
    useEffect(()=>{
        setLoading(true);
        const fetchData = async () => {
            try {
              let res;
              if (toggleState === 1) {
                const gender = 'Female';
                res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product/female/${gender}`);
              } else if (toggleState === 2) {
                const gender = 'Male';
                res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product/male/${gender}`);
              } else {
                res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product`);
              }
        
              setProducts(res.data);
              setLoading(false); // Set loading to false when data fetching is complete
            } catch (err) {
              console.log(err);
            }
          };
        
        fetchData();
        
    },[toggleState]);


    const handleClick = (item, size) => {
        const selectedColor = selectColor.length > 0 ? selectColor : item.colors[0].image[0].url;
        const selectedColorName = selectColorName.length > 0 ? selectColorName : item.colors[0].colorName;
        setSelectedSizes({ ...selectedSizes, [item._id]: size });
        addToCart({ ...item, size, colors: selectedColor, colorName: selectedColorName });
        setIsSuccessModalOpen(true);
        setAlertText("Item added to cart!");
        setTimeout(() => {
          setIsSuccessModalOpen(false);
        }, 5000);
    };
      

    const handleColorUpdate = (color,colorName,id) => {
        setSelectColor(color);
        setSelectColorName(colorName);
        setColorId(id);
    };
    
    return (
        <>
        {loading ? (
            <SkeletonLoader cards={5}/>
        ) : (
            products.map((item,i)=>{
                if (item.inStock === true){
                    const itemId = item._id;
                    const href = `/details/${itemId}`;
                    return (
                        <div className="box" key={i}>
                            <div className="tag"><small></small></div>
                            <div className="image-box">
                            <Link to={href}>
                                {selectColor.length > 0 && colorId === item._id ? (
                                    <img src={selectColor} alt={selectColor} />
                                ) : (
                                    item.colors.map((col, i) => {
                                    return col.image.map((pic, j) => {
                                        return <img src={pic.url} alt={item.name} key={j} />;
                                    });
                                    })
                                )}
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
                                {selectColorName && selectColorName.length > 0 ? (<p className="paragraph">{selectColorName}</p>) : (<p className="paragraph">{item.colors[0].colorName}</p>)}
                                
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
                                
                                {item.colors.map((col, i) => {
                                    return col.image.map((pic, j) => {
                                        return <img src={pic.url} alt={item.name} key={j} onClick={() =>
                                            handleColorUpdate(pic.url,col.colorName,item._id)} />;
                                    });
                                })}
                            </div>
                        </div>
                    )
                }
                return null
            })
        )}
        

        <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
        </>
    );
}
 
export default ImageCard;