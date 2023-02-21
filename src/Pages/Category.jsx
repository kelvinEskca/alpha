import React, { useState,useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import CategoryModal from "../Components/CategoryModal";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import Loader from "../Components/Loader";
import AlertModal from "../Components/AlertModal";
const Category = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [products,setProducts] = useState(null);
    const [loading,setLoading] = useState(true);
    const [productModal,setProductModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const [deletingId,setDeletingId] = useState('');

    const openModal = () =>{
        setProductModal(!productModal);
    }

    useEffect(()=>{
        const getproducts = async ()=>{
            try{
                const res = await axios.get('https://alphaapi-production.up.railway.app/alphaapi/category')
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
        setDeletingId(id); 
        setIsSubmitting(true);
        try{
            const res = await axios.post(`https://alphaapi-production.up.railway.app/alphaapi/category/delete/${id}`,{
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

    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
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
                                            <div className="text">
                                                <div className="column">
                                                    <h3 className="heading">Subcategory:</h3>
                                                    <h3 className="heading">{item.subcategory}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Description:</h3>
                                                    <h3 className="heading">{item.desc}</h3>
                                                </div>
                                            </div>

                                            <button onClick={()=>handleDelete(item)}>{deletingId === item._id ? (isSubmitting ? 'Deleting..' : 'Delete Category'): 'Delete Category'}</button>
                                        </div>
                                    )
                                })
                            )}
                            
                        </div>
                    </div>
                </section>

                <CategoryModal openModal={openModal} productModal={productModal} />
                <Modal modal={modal} handleModal={handleModal} />
                <MobileNav mobile={mobile} handleMobile={handleMobile} />
                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
            </main>
            <Footer />
        </>
    );
}
 
export default Category;