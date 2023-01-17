import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
const ProductModal = ({productModal,openModal}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    
    const handleChange = (e) =>{
        e.preventDefault();
        setProduct({...product,[e.target.name]: e.target.value})
    }
    const addProduct = async (e) =>{
        e.preventDefault();
        if(product !== ''){
            try{
                const result = await axios.post('http://localhost:5000/alphaapi/product',{
                    title:product.title,
                    desc:product.desc,
                    category:product.category,
                    //image:product.image,
                    quantity:product.quantity,
                    price:product.price,
                    //galleryImage:product.galleryImage,
                    sizes:product.sizes,
                    colors:product.colors,
                    userId:user._id
                },{ headers:{token:token} });
                if(result.status === 200){
                    alert("Product updated successfuly");
                    navigate('/products')
                    localStorage.setItem('address',JSON.stringify(result.data));
                }
                else{
                    alert("Address failed to upload successfuly")
                }
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            alert('Ensure All inputs are filled!');
        }
    }

    //add products;
    const [product,setProduct] = useState({title:"",desc:"",category:"", quantity:"",price:"",colors:"",size:""});
    
    return (
        <section className={`section addressModal  ${productModal ? ('modal') : ('off')}`} >
            <div className="wrapper">
                <div className="boxes" >
                    <div className="box">
                        <form action="#" className="form" onSubmit={addProduct}>
                            <h3 className="heading">Add a new product</h3>
                            <div className="row-label">
                                <label htmlFor="#">Product Title 
                                    <input type="text" id="title" name="title" onChange={handleChange}/>
                                </label>

                                <label htmlFor="#">Product Description 
                                    <textarea name="desc" id="description" cols="30" rows="10"  onChange={handleChange}></textarea>
                                </label>
                            </div>
                            
                            <label htmlFor="#">Product Category 
                                <input type="text" id="category" name="category" onChange={handleChange}/>
                            </label>

                            <label htmlFor="#">Product Quantity 
                                <input type="text" id="quantity" name="quantity" onChange={handleChange}/>
                            </label>

                            <label htmlFor="#">Product Price 
                                <input type="text" id="price" name="price" onChange={handleChange}/>
                            </label>

                            {/* <div className="row-label">
                                <label htmlFor="#">Gallery Image 
                                    <input type="text" id="gallery" name="gallery" onChange={handleChange}/>
                                </label>

                            </div> */}

                            <label htmlFor="#">Product Sizes 
                                <select name="sizes" id="sizes" multiple onChange={handleChange}>
                                    <option value="S">S</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                            </label>

                            <div className="row-label">
                                <label htmlFor="#">Product Colors 
                                    <select name="colors" id="colors" multiple onChange={handleChange}>
                                        <option value="White">White</option>
                                        <option value="Black">Black</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Red">Red</option>
                                    </select>
                                </label>
                            </div>

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