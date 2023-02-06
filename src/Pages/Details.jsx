import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import ImageCard from "../Components/ImageCard";
import Loader from "../Components/Loader";
const Details = () => {
    axios.defaults.withCredentials = true;
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const {id} = useParams();
    useEffect(()=>{
        const getproducts = async ()=>{
            try{
                const res = await axios.get(`https://alphaapi-production.up.railway.app/alphaapi/product/${id}`)
                setProducts([res.data]);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getproducts();
    },[id]);
    const handleMobile = () =>{
        setMobile(!mobile);
    }
    const handleModal = () =>{
        setModal(!modal);
    }


    if(loading) return <Loader />;
    return (  
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                <section className="section detailss">
                    <div className="wrapper">
                        <div className="boxes">
                            {products.map((item,i)=>{
                                return (
                                    <div className="box" key={item._id}>
                                        <div className="product-image">
                                            <img src={`${item.image[0].url}`} alt={item.image[0]} />
                                        </div>
                                    </div>
                                )
                            })}
                           
                        </div>
                    </div>
                </section>

                <div className="row-sections">
                    <section className="details">
                        <div className="bottom-wrapper">
                            <div className="top">
                                <div className="left">
                                    <h3 className="heading">Amplify Bra</h3>
                                    <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, rem!</p>
                                    <small>Mocha</small>
                                </div>
                                <div className="right">
                                    <h3 className="heading red">$200</h3>
                                </div>
                            </div>

                            <div className="row-top">
                                <div className="color-box">
                                    <h3 className="heading">19 colors | Mocha</h3>
                                    <div className="color-rounds">
                                        <div className="color-image">
                                            <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                        </div>

                                        <div className="color-image">
                                            <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                        </div>

                                        <div className="color-image">
                                            <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                        </div>

                                        <div className="color-image">
                                            <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                        </div>

                                        <div className="color-image">
                                            <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                        </div>

                                        <div className="color-image">
                                            <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="sizes-box">
                                    <div className="top">
                                        <h3 className="heading">Select Size</h3>
                                    </div>

                                    <div className="size-box">
                                        <div className="size">
                                            <small>S</small>
                                        </div>
                                        <div className="size">
                                            <small>S</small>
                                        </div>
                                        <div className="size">
                                            <small>S</small>
                                        </div>
                                        <div className="size">
                                            <small>S</small>
                                        </div>
                                        <div className="size">
                                            <small>S</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="desc-box">
                                <div className="description">
                                    <div className="desc-top">
                                        <h3 className="heading">Description</h3>
                                        <h3 className="heading">+</h3>
                                    </div>

                                    <div className="desc-bottom">
                                        <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur illum recusandae et dolore dolorem eaque ipsa placeat, possimus quibusdam debitis!</p>
                                    </div>
                                </div>

                                <div className="description">
                                    <div className="desc-top">
                                        <h3 className="heading">Description</h3>
                                        <h3 className="heading">+</h3>
                                    </div>

                                    <div className="desc-bottom">
                                        <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur illum recusandae et dolore dolorem eaque ipsa placeat, possimus quibusdam debitis!</p>
                                    </div>
                                </div>

                                <div className="description">
                                    <div className="desc-top">
                                        <h3 className="heading">Description</h3>
                                        <h3 className="heading">+</h3>
                                    </div>

                                    <div className="desc-bottom">
                                        <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur illum recusandae et dolore dolorem eaque ipsa placeat, possimus quibusdam debitis!</p>
                                    </div>
                                </div>
                            </div>

                            <button className="sizebtn">Select Size</button>

                            <button className="addbtn">Add to bag</button>
                        </div>
                    </section>

                    <section className="section new details-page">
                        <div className="wrapper">
                            <div className="area">
                                <h3 className="heading">You May Also Like</h3>
                            </div>
                            <div className="boxes">
                                <ImageCard />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="desktop-details">
                    <div className="desktop-details-top">
                        <div className="grid-top">
                            <div className="top">
                                <div className="left">
                                    <h3 className="heading">Amplify Bra</h3>
                                    <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, rem!</p>
                                    <small>Mocha</small>
                                </div>
                                <div className="right">
                                    <h3 className="heading red">$200</h3>
                                </div>
                            </div>

                            <div className="center">
                                {products.map((item,i)=>{
                                    return (
                                        <div className="box" key={item._id}>
                                            <div className="product-image">
                                                <img src={`${item.image[0].url}`} alt={item.image[0]} />
                                                <img src={`${item.image[1].url}`} alt={item.image[1]} />
                                                <img src={`${item.image[1].url}`} alt={item.image[1]} />
                                                <img src={`${item.image[1].url}`} alt={item.image[1]} />
                                                <img src={`${item.image[1].url}`} alt={item.image[1]} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="right">
                                <div className="row-top">
                                    <div className="color-box">
                                        <h3 className="heading">19 colors | Mocha</h3>
                                        <div className="color-rounds">
                                            <div className="color-image">
                                                <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                            </div>

                                            <div className="color-image">
                                                <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                            </div>

                                            <div className="color-image">
                                                <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                            </div>

                                            <div className="color-image">
                                                <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                            </div>

                                            <div className="color-image">
                                                <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                            </div>

                                            <div className="color-image">
                                                <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div className="sizes-box">
                                        <div className="top">
                                            <h3 className="heading">Select Size</h3>
                                        </div>

                                        <div className="size-box">
                                            <div className="size">
                                                <small>S</small>
                                            </div>
                                            <div className="size">
                                                <small>S</small>
                                            </div>
                                            <div className="size">
                                                <small>S</small>
                                            </div>
                                            <div className="size">
                                                <small>S</small>
                                            </div>
                                            <div className="size">
                                                <small>S</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="sizebtn">Select Size</button>

                                <button className="addbtn">Add to bag</button>
                            </div>
                        </div>

                        <div className="grid-bottom">
                            <span>
                                <div className="top">
                                    <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto adipisci autem velit sed amet repudiandae ut, repellendus possimus perferendis doloremque!</p>
                                </div>

                                <div className="bottom">
                                    <h3 className="heading">Description</h3>
                                </div>
                            </span>
                           
                            <span>
                                <div className="top">
                                    <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto adipisci autem velit sed amet repudiandae ut, repellendus possimus perferendis doloremque!</p>
                                </div>

                                <div className="bottom">
                                    <h3 className="heading">Description</h3>
                                </div>
                            </span>
                            
                            <span>
                                <div className="top">
                                    <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto adipisci autem velit sed amet repudiandae ut, repellendus possimus perferendis doloremque!</p>
                                </div>

                                <div className="bottom">
                                    <h3 className="heading">Description</h3>
                                </div>
                            </span>
                           
                            <span>
                                <div className="top">
                                    <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto adipisci autem velit sed amet repudiandae ut, repellendus possimus perferendis doloremque!</p>
                                </div>

                                <div className="bottom">
                                    <h3 className="heading">Description</h3>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <section className="section new details-page desktop-details-page">
                    <div className="wrapper">
                        <div className="area">
                            <h3 className="heading">You May Also Like</h3>
                        </div>
                        <div className="boxes">
                            <ImageCard />
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
 
export default Details;