import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import ProductModal from "../Components/ProductModal";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import Loader from "../Components/Loader";
import AlertModal from "../Components/AlertModal";
const Dashboard = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [productModal,setProductModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const [deletingId,setDeletingId] = useState('');

    const openModal = () =>{
        setProductModal(!productModal);
    }

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

    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        sizes: [],
        images: [],
        price: "",
        category: "",
        subcategory: "",
        colorName: "",
        quantity: "",
        inStock: ""
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageChange = e => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        const sizesArray = formData.sizes.split(',').map(size => size.trim());
        const data = new FormData();
        data.append("name", formData.name);
        data.append("desc", formData.desc);
        data.append("sizes", sizesArray);
        for (let i = 0; i < formData.images.length; i++) {
            data.append("image", formData.images[i]);
        }
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("subcategory", formData.subcategory);
        data.append("quantity", formData.quantity);
        data.append("colorName", formData.colorName);
        data.append("inStock", formData.inStock);
        try {
            const res = await axios.post("http://localhost:5000/alphaapi/product", data,{headers:{token:token}});
            if(res.status === 200){
                const newProduct = res.data.product;
                setProducts([...products, newProduct]);
                console.log(products);
                setIsSuccessModalOpen(true);
                setAlertText("Product Added Successfully!");
                setIsSubmitting(false);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
            }
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(()=>{
        getproducts();
    },[]);

    const handleDelete = async (i) =>{
        const id = i._id;
        setDeletingId(id); 
        setIsSubmitting(true);
        try{
            const res = await axios.post(`http://localhost:5000/alphaapi/product/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                setIsSuccessModalOpen(true);
                setAlertText("Product Deleted Successfully!");
                setProducts(products.filter(product => product._id !== id));
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
                setIsSubmitting(false);
            }
            else{
                setIsSuccessModalOpen(true);
                setAlertText("Error Deleting Product!");
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
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
                                            <Link to={`/details/${item._id}`}>
                                                <div className="product-image">
                                                    {item.image && item.image.length > 0 && (
                                                        <img src={`${item.image[0].url}`} alt={item.image[0].url} />
                                                    )}
                                                </div>
                                            </Link>

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

                                            <div className="text">
                                                <span><h3 className="heading">Instock: {item.inStock ? "True" : "False"}</h3></span>
                                            </div>

                                            <button onClick={()=>handleDelete(item)}>{deletingId === item._id ? (isSubmitting ? 'Deleting..' : 'Delete Product') : 'Delete Product'}</button>
                                        </div>
                                        
                                    )
                                })
                            )}
                            
                        </div>
                    </div>
                </section>

                <ProductModal openModal={openModal} productModal={productModal} isSubmitting={isSubmitting} handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} />
                <Modal modal={modal} handleModal={handleModal} />
                <MobileNav mobile={mobile} handleMobile={handleMobile} />
                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
            </main>
            <Footer />
        </>
    );
}
 
export default Dashboard;