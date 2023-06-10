import React, { useState,useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import CategoryModal from "../Components/CategoryModal";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import AlertModal from "../Components/AlertModal";
import baseUrl from "../config/config.js";
import Search from "../Components/Search";
const Category = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [productModal,setProductModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const [deletingId,setDeletingId] = useState('');
    const [search,setSearch] = useState(false);

    const openModal = () =>{
        setProductModal(!productModal);
    }

    const getproducts = async ()=>{
        try{
            const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/category`);
            setProducts(res.data);
            setLoading(false);
        }
        catch(err){
            console.log(err);
        }
    }
    

    useEffect(()=>{
        getproducts();
    },[]);

    const handleDelete = async (i) =>{
        const id = i._id;
        setDeletingId(id); 
        setIsSubmitting(true);
        try{
            const res = await axios.post(`${baseUrl.baseUrl}/alphaapi/category/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                setIsSuccessModalOpen(true);
                setAlertText("Category Deleted Successfully!");
                setProducts(products.filter(product => product._id !== id));
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
                setIsSubmitting(false);
            }
            else{
                setAlertText("Category Not Deleted Successfully!");
                setIsSuccessModalOpen(true);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
                setIsSubmitting(false);
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

    const searchToggle = () =>{
        setSearch(!search);
    };
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle}/>
            <main className="main">
                <section className="section latest products-latest category">
                    <div className="wrapper">
                        <div className="top">
                            <h3 className="heading">Available Category</h3>
                            <button onClick={openModal}>Add Category +</button>
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
                                            <div className="column">
                                                <h3 className="heading">Category:</h3>
                                                <h3 className="heading">{item.name}</h3>
                                            </div>
                                            {item.subcategories.map((sub,j)=>{
                                                return (
                                                    <div className="text">
                                                        <div className="column">
                                                            <h3 className="heading">Subcategory:</h3>
                                                            <h3 className="heading">{sub.subcategoryname}</h3>
                                                        </div>

                                                        <div className="column">
                                                            <h3 className="heading">Description:</h3>
                                                            <h3 className="heading">{sub.description}</h3>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            

                                            <button onClick={()=>handleDelete(item)}>{deletingId === item._id ? (isSubmitting ? 'Deleting..' : 'Delete Category'): 'Delete Category'}</button>
                                        </div>
                                    )
                                })
                            )}
                            
                        </div>
                    </div>
                </section>

                <CategoryModal openModal={openModal} productModal={productModal} setProducts={setProducts} products={products} />
                <Modal modal={modal} handleModal={handleModal} />
                <MobileNav mobile={mobile} handleMobile={handleMobile} />
                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
                <Search search={search} searchToggle={searchToggle} />
            </main>
            <Footer />
        </>
    );
}
 
export default Category;