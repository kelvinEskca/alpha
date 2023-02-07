import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import Loader from "./Loader";
const ProductModal = ({productModal,openModal}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [products,setProducts] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading,setLoading] = useState(true);
    
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        sizes: [],
        images: [],
        price: "",
        category: "",
        subcategory: "",
        color: "",
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
        data.append("colorName", formData.color);
        data.append("inStock", formData.inStock);
        try {
            const res = await axios.post("https://alphaapi-production.up.railway.app/alphaapi/product", data,{headers:{token:token}});
            if(res.status === 200){
                alert(res.statusText);
                setIsSubmitting(false);
                navigate('/products');
            }
        } catch (err) {
        console.error(err);
        }
    };

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
    if(loading) return <Loader />;
    return (
        <section className={`section addressModal  ${productModal ? ('modal') : ('off')}`} >
            <div className="wrapper">
                <div className="boxes" >
                    <div className="box">
                        <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <h3 className="heading">Add a new product</h3>
                            <label htmlFor="#">Product Name
                                <input type="text" name="name" placeholder="Product name" onChange={handleChange} value={formData.name}/>
                            </label>

                            <label htmlFor="#">Product Description
                                <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Product Description" onChange={handleChange} value={formData.desc}></textarea>
                            </label>

                            <label htmlFor="#">Product Sizes
                                <input type="text" name="sizes" placeholder="Sizes (comma separated)" onChange={handleChange} value={formData.sizes}/>
                            </label>

                            <label htmlFor="#">Product Color
                                <input type="text" name="colorName" placeholder="Product Color" onChange={handleChange} value={formData.color}/>
                            </label>

                            <label htmlFor="#">Product Image
                                <input type="file" name="images" placeholder="Images" onChange={handleImageChange} multiple/>
                            </label>

                            <label htmlFor="#">Product Price
                                <input type="text" name="price" placeholder="Price" onChange={handleChange} value={formData.price}/>
                            </label>

                            <label htmlFor="#">Product Category
                                <select name="category" placeholder="Category" onChange={handleChange} value={formData.category}>
                                    <option value="" disabled>Select An Option</option>
                                    {products.map((cat,i)=>{
                                        return (
                                            <>
                                                <option value={cat.name} key={cat._id}>{cat.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </label>
                            
                            <label htmlFor="#">Product Subcategory
                                <select name="subcategory" placeholder="SubCategory" onChange={handleChange} value={formData.subcategory}>
                                    <option value="" disabled>Select An Option</option>
                                    {products.map((cat,i)=>{
                                        return (
                                            <>
                                                <option value={cat.subcategory} key={cat._id}>{cat.subcategory}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </label>

                            <label htmlFor="#">Product Quantity
                                <input type="text" name="quantity" placeholder="Quantity" onChange={handleChange} value={formData.quantity}/>
                            </label>

                            <label htmlFor="#">
                                <input type="text" name="inStock" placeholder="In stock (true/false)" onChange={handleChange} value={formData.inStock}/>
                            </label>

                            <label htmlFor="#">
                                <Button btnText={isSubmitting ? 'Uploading..' : 'Add Product'} />
                            </label>

                            <label htmlFor="#">
                                <button type="button" onClick={openModal}>Cancel</button>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default ProductModal;