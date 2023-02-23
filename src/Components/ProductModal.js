import React,{useState,useEffect} from "react";
import Button from "./Button";
import axios from "axios";
import Loader from "./Loader";
const ProductModal = ({productModal,openModal,isSubmitting,handleSubmit,handleChange,handleImageChange,formData}) => {
    axios.defaults.withCredentials = true;
    const [products,setProducts] = useState(null);
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        const getproducts = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/alphaapi/category')
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

                            <label htmlFor="#">Product Color Name
                                <input type="text" name="colorName" placeholder="Product Color" onChange={handleChange} value={formData.colorName}/>
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