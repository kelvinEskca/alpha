import React,{useState,useEffect} from "react";
import { useContext } from "react";
import CartContext from "../CartContext";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
const Men = () => {
    const [modal,setModal] = useState(false)
    const [mobile,setMobile] = useState(false)
    const [men,setMen] = useState('')
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedSize,setSelectedSize] = useState('');
    const {addToCart} = useContext(CartContext);
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    useEffect(()=>{
        const getproducts = async ()=>{
            try{
                const res = await axios.get('https://alphaapi-production.up.railway.app/alphaapi/product')
                setProducts(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getproducts();
        setLoading(false);
        const filter = () =>{
            const search = products.filter(item=>{
                return item.category.toString() === 'Male';
            })
            setMen(search);
        }
        filter();
   },[men,products]);

    const handleClick = (size,item)=>{
        setSelectedSize(size);
        addToCart({...item, size});
    }
    
   if(loading) return <h3 className='heading'>Loading....</h3>
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                <section className="section shop">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
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

                <section className="section new gallery">
                    <div className="wrapper">
                        <div className="boxes">
                        {men.length > 0 ? (
                            men.map((item)=>{
                                return (
                                    <div className="box" key={item.id}>
                                        <div className="tag"><small></small></div>
                                        <div className="image-box">
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0].originalname} className="imageOne" />
                                            <img src={`../images/${item.image[1].originalname}`} alt={item.image[1].originalname} className="imageTwo" />
                    
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
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                    
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                            <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} className="imageOne" />
                                        </div>
                                    </div>
                                )
                            })
                        ):(<h3>No Products</h3>)}
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