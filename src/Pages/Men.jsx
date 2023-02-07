import React,{useState,useEffect} from "react";
import { useContext } from "react";
import CartContext from "../CartContext";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
const Men = () => {
    const [modal,setModal] = useState(false)
    const [mobile,setMobile] = useState(false)
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState({});

    const [size,setSize] = useState('');
    const [gender,setGender] = useState('');
    const [proType,setProType] = useState('');
    const [openItem, setOpenItem] = useState("");

    const {addToCart} = useContext(CartContext);
    const handleModal = () =>{
        setModal(!modal);
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

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    useEffect(()=>{
        const gender = 'Male';
        const getproducts = async ()=>{
            try{
                const res = await axios.get(`https://alphaapi-production.up.railway.app/alphaapi/product/male/${gender}`)
                setProducts(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getproducts();
        setLoading(false);
        
   },[]);

    const handleClick = (size, item) => {
        setSelectedSizes({ ...selectedSizes, [item._id]: size });
        addToCart({ ...item, size });
    };
    
    products.map((item)=>{
        return (
            console.log(item.subcategory)
        )
    })

    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                <section className="section visit hero shop">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box cards">
                                <img src="../images/0F6A0266_2.jpg" alt="0F6A0266_2" />
                                <div className="text-box">
                                    <h3 className="heading">Shop For Him</h3>
                                    <Button btnText={'Shop Hoodies'} />
                                    <Button btnText={'Shop Joggers'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section new">
                    <div className="wrapper">
                        <div className="boxes">
                        {products.length > 0 ? (
                            products.map((item,i)=>{
                                return (
                                    <div className="box" key={i}>
                                        <div className="tag"><small></small></div>
                                        <div className="image-box">
                                            <Link to={`details/${item._id}`}>
                                                <img src={`${item.image[0].url}`} alt={item.image[0].url} className="imageOne" />
                                                <img src={`${item.image[1].url}`} alt={item.image[1].url} className="imageTwo" />
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
 
export default Men;