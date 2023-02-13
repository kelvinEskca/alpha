import React,{useState,useEffect} from "react";
import { useContext } from "react";
import CartContext from "../CartContext";
import VideoCard from '../Components/VideoCard';
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import SlideShow from "../Components/SlideShow";
const Women = () => {
    const [modal,setModal] = useState(false)
    const [mobile,setMobile] = useState(false)
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState({});
    const {addToCart} = useContext(CartContext);
    const [hero,setHero] = useState([]);

    const [setSize] = useState('');
    const [setGender] = useState('');
    const [setProType] = useState('');
    const [openItem, setOpenItem] = useState("");


    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    const openModal = (item) =>{
        if (item === openItem) {
            setOpenItem("");
        } else {
            setOpenItem(item);
        }
        if(item === "gender"){
            setGender("gender");
        }
        else if(item === "size"){
            setSize("size");
        }
        else if(item === "product"){
            setProType("product");
        }
    }

    useEffect(()=>{
        const getproducts = async ()=>{
            const gender = 'Female';
            try{
                const res = await axios.get(`https://alphaapi-production.up.railway.app/alphaapi/product/female/${gender}`)
                setProducts(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getproducts();
        const getHero = async ()=>{
            try{
                const res = await axios.get('https://alphaapi-production.up.railway.app/alphaapi/hero')
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

    const handleClick = (size, item) => {
        setSelectedSizes({ ...selectedSizes, [item._id]: size });
        addToCart({ ...item, size });
    };
    
    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
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

                <section className="section new">
                    <div className="wrapper">
                        <div className="boxes">
                        {products.length > 0 ? (
                            products.map((item,i)=>{
                                if(item.inStock === true){

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
                                                            }`} onClick={()=>handleClick(size,item)}>{size}</small></div>)
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
                                                    }`} onClick={()=>handleClick(size,item)}>{size}</small></div>)
                                                })}
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            })
                        ):(<h3>No Products</h3>)}
                            {products.length > 0 ? (
                                products.map((item,i)=>{
                                    return (
                                        <div className="desktop-details inner-deskt-details">
                                            <div className="desktop-details-top">
                                                <div className="grid-bottom inner-page-bottom">
                                                    <span className={openItem === "gender" ? ("high") : ("")}>
                                                        <div className="top">
                                                            <Link to='/men'><p className="paragraph">Male</p></Link>
                                                            <Link to='women'><p className="paragraph">Female</p></Link>
                                                        </div>

                                                        <div className="bottom" onClick={()=>openModal("gender")}>
                                                            <h3 className="heading">Product Gender</h3>
                                                        </div>
                                                    </span>

                                                    <span className={openItem === "size" ? ("high") : ("")}>
                                                        <div className="top">
                                                        {item.sizes.map((size)=>{
                                                            return <p className="paragraph">{size}</p>
                                                        })}  
                                                            
                                                        </div>

                                                        <div className="bottom"onClick={()=>openModal("size")}>
                                                            <h3 className="heading">Product Size</h3>
                                                        </div>
                                                    </span>

                                                    <span className={openItem === "product" ? ("high") : ("")}>
                                                        <div className="top">
                                                            <p className="paragraph">{item.subcategory}</p>
                                                        </div>

                                                        <div className="bottom" onClick={()=>openModal("product")}>
                                                            <h3 className="heading">Product Type</h3>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </section>

                <Modal modal={modal} handleModal={handleModal} />

                <MobileNav mobile={mobile} handleMobile={handleMobile} />
            </main>
            <Footer />
        </>
    );
}
 
export default Women;