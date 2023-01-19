import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
const ProductModal = ({productModal,openModal}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        sizes: [],
        images: [],
        price: "",
        category: "",
        colors: [],
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
        const sizesArray = formData.sizes.split(',').map(size => size.trim());
        const colorArray = formData.colors.split(',').map(color => color.trim());
        const data = new FormData();
        data.append("name", formData.name);
        data.append("desc", formData.desc);
        data.append("sizes", sizesArray);
        for (let i = 0; i < formData.images.length; i++) {
            data.append("image", formData.images[i]);
        }
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("colors", colorArray);
        data.append("quantity", formData.quantity);
        data.append("inStock", formData.inStock);
        try {
            const res = await axios.post("http://localhost:5000/alphaapi/product", data,{headers:{token:token}});
            console.log(res);
            if(res.status === 200){
                navigate('/products')
            }
        } catch (err) {
        console.error(err);
        }
    };
    
    return (
        <section className={`section addressModal  ${productModal ? ('modal') : ('off')}`} >
            <div className="wrapper">
                <div className="boxes" >
                    <div className="box">
                        <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <h3 className="heading">Add a new product</h3>
                            <label htmlFor="#">
                                <input type="text" name="name" placeholder="Product name" onChange={handleChange} value={formData.name}/>
                            </label>

                            <label htmlFor="#">
                                <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Product Description" onChange={handleChange} value={formData.desc}></textarea>
                            </label>

                            <label htmlFor="#">
                                <input type="text" name="sizes" placeholder="Sizes (comma separated)" onChange={handleChange} value={formData.sizes}/>
                            </label>

                            <label htmlFor="#">
                                <input type="file" name="images" placeholder="Images" onChange={handleImageChange} multiple/>
                            </label>

                            <label htmlFor="#">
                                <input type="text" name="price" placeholder="Price" onChange={handleChange} value={formData.price}/>
                            </label>

                            <label htmlFor="#">
                                <input type="text" name="category" placeholder="Category" onChange={handleChange} value={formData.category}/>
                            </label>

                            <label htmlFor="#">
                                <input type="text" name="colors" placeholder="Colors (comma separated)" onChange={handleChange} value={formData.colors}/>
                            </label>

                            <label htmlFor="#">
                                <input type="text" name="quantity" placeholder="Quantity" onChange={handleChange} value={formData.quantity}/>
                            </label>

                            <label htmlFor="#">
                                <input type="text" name="inStock" placeholder="In stock (true/false)" onChange={handleChange} value={formData.inStock}/>
                            </label>

                            <label htmlFor="#">
                                <Button btnText={'Add Product'} />
                            </label>

                            <label htmlFor="#">
                                <button onClick={openModal}>Cancel</button>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default ProductModal;