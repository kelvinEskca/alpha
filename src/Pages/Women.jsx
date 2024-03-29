import React,{useState,useEffect} from "react";
import { useContext } from "react";
import CartContext from "../CartContext";
import VideoCard from '../Components/VideoCard';
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import { Link } from "react-router-dom";
import baseUrl from "../config/config.js";
import Search from "../Components/Search";
import AlertModal from "../Components/AlertModal";
const Women = () => {
    const [modal,setModal] = useState(false)
    const [mobile,setMobile] = useState(false)
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState({});
    const {addToCart} = useContext(CartContext);
    const [hero,setHero] = useState([]);
    const [activeGrid,setActiveGrid] = useState(false);
    const [lastClickedFilter, setLastClickedFilter] = useState(null);
    const [search,setSearch] = useState(false);
    const [grabProductType,setGrabProductType] = useState([]);
    const [grabSizes,setGrabSizes] = useState([]);
    const [grabProductContent,setGrabProductContent] = useState([]);
    const [selectColor, setSelectColor] = useState([]);
    const [selectColorName, setSelectColorName] = useState([]);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [colorId, setColorId] = useState();
    const [alertText,setAlertText] = useState('');
    let content;

    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    useEffect(()=>{
        const getproducts = async ()=>{
            const gender = 'Female';
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product/female/${gender}`);
                console.log(res);
                setProducts(res.data);
                setLoading(false);

                // Get all the product types
                const productTypes = res.data.map(product => product.subcategory);
                setGrabProductType(productTypes);
              
                // Get all the sizes
                const sizes = res.data.reduce((acc, product) => {
                product.sizes.forEach(size => {
                    if (!acc.includes(size)) {
                    acc.push(size);
                    }
                });
                return acc;
                }, []);
                setGrabSizes(sizes);
            }
            catch(err){
                console.log(err);
            }
        }
        getproducts();
        const getHero = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/hero`)
                setHero(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getHero();
        setLoading(false);

    },[]);
    
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
      

    const activateFilter = (filter) => {
        if (lastClickedFilter === filter) {
            setActiveGrid(false); // deactivate the grid filter area
            setLastClickedFilter(null); // reset the last clicked filter
        } else {
            setActiveGrid(true); // activate the grid filter area
            setLastClickedFilter(filter); // set the last clicked filter
        }
    }

    const searchToggle = () =>{
        setSearch(!search);
    };

    const filterBySize = (size)=>{
        const filteredProducts = products.filter((product) => product.sizes.includes(size));
        setGrabProductContent(filteredProducts);
    }

    const filterBySubCategory = (subcategory) => {
        const filteredProducts = products.filter((product) =>
          product.subcategory === subcategory
        );
        setGrabProductContent(filteredProducts);
    };

    if(lastClickedFilter === "gender"){
        content = (
            <div className="box-grid gender-grid">
                <div className="top-box-grid">
                    <Link to="/women">Women</Link>
                </div>
                <div className="top-box-grid">
                    <Link to="/men">Men</Link>
                </div>
            </div>
        )
        
    }
    else if(lastClickedFilter === 'size'){
        content = (
            <div className="box-grid">
                {grabSizes && grabSizes.map((item,i)=>{
                    return (
                        <div className="top-box-grid" key={i} onClick={() => filterBySize(item)}>
                            <h3 className="heading">{item}</h3>
                        </div>
                    )
                })}
            </div>
            
        )
    }
    else if(lastClickedFilter === 'productType'){
        content = (
            <div className="box-grid">
                {grabProductType && grabProductType.map((item,i)=>{
                    return (
                        <div className="top-box-grid" key={i} onClick={() => filterBySubCategory(item)}>
                            <h3 className="heading">{item}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }

    const handleColorUpdate = (color,colorName,id) => {
        setSelectColor(color);
        setSelectColorName(colorName);
        setColorId(id);
    };
    
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle}/>
            <main className="main">
                {hero.map((item,i)=>{
                    if(item.active === true && item.category === "Female"){
                        return(
                            <section className="section visit hero">
                                <div className="wrapper">
                                    <div className="boxes">
                                        <VideoCard video={item.image[0].url} heading={item.title} paragraph={item.subtitle} btn={item.cta} btnTwo={item.ctatwo} cat={item.category} />
                                    </div>
                                </div>
                            </section>
                        )
                    }
                    return null
                })}
                {hero.some(item => item.active === true) ? null : <div></div>}

                {grabProductContent.length > 0 ? (
                    <section className="section new">
                        <div className="wrapper">
                            <div className="boxes">
                                {grabProductContent.length > 0 ? (
                                    grabProductContent.map((item,i)=>{
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
                                ):(<h3>No Products</h3>)}
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="section new">
                        <div className="wrapper">
                            <div className="boxes">
                                {products.length > 0 ? (
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
                                ):(<h3>No Products</h3>)}
                            </div>
                        </div>
                    </section>
                )}

                <Modal modal={modal} handleModal={handleModal} />
                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
                <MobileNav mobile={mobile} handleMobile={handleMobile} />
                <Search search={search} searchToggle={searchToggle} />
            </main>
            <Footer />
            <div className={`grid-filter-area ${activeGrid ? ("grid-filter-area activegrid-filter"):("grid-filter-area ")}`}>
                <div className="top-area">
                   {content}
                </div>
                <div className="bottom-area">
                    <div className="bottom-area-wrapper">
                        <div className={`bottom-area-box ${lastClickedFilter === 'gender' ? ("activeBottom") : ("bottom-area-box")}`} onClick={() => activateFilter("gender")}>
                            <h3 className="heading">Gender</h3>
                        </div>

                        <div className={`bottom-area-box ${lastClickedFilter === 'size' ? ("activeBottom") : ("bottom-area-box")}`} onClick={() => activateFilter("size")}>
                            <h3 className="heading">Size</h3>
                        </div>

                        <div className={`bottom-area-box ${lastClickedFilter === 'productType' ? ("activeBottom") : ("bottom-area-box")}`} onClick={() => activateFilter("productType")}>
                            <h3 className="heading">Product Type</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Women;