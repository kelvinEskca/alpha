import React, { useState,useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import ProductModal from "../Components/ProductModal";
const Dashboard = () => {
    axios.defaults.withCredentials = true;
    const [products,setProducts] = useState(null);
    const [loading,setLoading] = useState(true);
    const [productModal,setProductModal] = useState(false);
    const openModal = () =>{
        setProductModal(!productModal);
    }

    useEffect(()=>{
        const getproducts = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/alphaapi/product')
                setProducts(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getproducts();
    },[]);

    if(loading) return <h1>Loading</h1>;
    return (
        <>
            <Header />
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
                                                <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                            </div>

                                            <div className="text">
                                                <div className="column">
                                                    <h3 className="heading">Name</h3>
                                                    <h3 className="heading">{item.title}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Price</h3>
                                                    <h3 className="heading">${item.price}</h3>
                                                </div>
                                            </div>

                                            <div className="text">
                                                <span><h3 className="heading">Quantity:{item.quantity}</h3></span>
                                                <span><h3 className="heading">Category:{item.category[0]}</h3></span>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                            
                        </div>
                    </div>
                </section>

                <ProductModal openModal={openModal} productModal={productModal} />
            </main>
            <Footer />
        </>
    );
}
 
export default Dashboard;