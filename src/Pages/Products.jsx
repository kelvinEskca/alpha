import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import ProductModal from "../Components/ProductModal";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
const Dashboard = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [products,setProducts] = useState(null);
    const [loading,setLoading] = useState(true);
    const [productModal,setProductModal] = useState(false);
    
    const navigate = useNavigate();

    const openModal = () =>{
        setProductModal(!productModal);
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
    },[]);

    const handleDelete = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`https://alphaapi-production.up.railway.app/alphaapi/product/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.statusText);
                navigate('/dashboard');
            }
            else{
                alert(res.statusText);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const handleModal = () =>{
        setModal(!modal);
    }
    const handleMobile = () =>{
        setMobile(!mobile);
    }

    if(loading) return <h1>Loading</h1>;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                <section className="section latest products-latest">
                    <div className="wrapper">
                        <div className="top">
                            <h3 className="heading">Available Products</h3>
                            <button onClick={openModal}>Add Products +</button>
                        </div>
                         
                        <div className="boxes">
                            {products.length === 0 ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                products.map((item,i)=>{
                                    return(
                                        <div className="products" key={i}>
                                            <div className="product-image">
                                                <img src={`../images/${item.image[0].originalname}`} alt={item.image[0]} />
                                            </div>

                                            <div className="text">
                                                <div className="column">
                                                    <h3 className="heading">Name:</h3>
                                                    <h3 className="heading">{item.name}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Price:</h3>
                                                    <h3 className="heading">${item.price}</h3>
                                                </div>
                                            </div>

                                            <div className="text">
                                                <span><h3 className="heading">Quantity:{item.quantity}</h3></span>
                                                <span><h3 className="heading">Category:{item.category}</h3></span>
                                            </div>

                                            <button onClick={()=>handleDelete(item)}>Delete Product</button>
                                        </div>
                                    )
                                })
                            )}
                            
                        </div>
                    </div>
                </section>

                <ProductModal openModal={openModal} productModal={productModal} />
                <Modal modal={modal} handleModal={handleModal} />
                <MobileNav mobile={mobile} handleMobile={handleMobile} />
            </main>
            <Footer />
        </>
    );
}
 
export default Dashboard;