import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import Loader from "./Loader";
import baseUrl from "../config/config.js";
const ProductModal = ({productModal,openModal}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');
    const [subcategory,setSubcategory] = useState('');
    const [loading,setLoading] = useState(false);
    
    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        if(name === ''  || desc === '' || subcategory === ''){
            alert('Please ensure all fields are filled');
        }
        else{
            try {
                const res = await axios.post(`${baseUrl.baseUrl}/alphaapi/category`,{
                    name:name,
                    desc:desc,
                    subcategory:subcategory
                },{headers:{token:token}});
                console.log(res);
                setLoading(true);
                if(res.status === 200){
                    setLoading(false);
                    setIsSubmitting(false);
                    navigate('/category');
                }
            } catch (err) {
            console.error(err);
            }
        }
    };
    if(loading) return <Loader />;
    return (
        <section className={`section addressModal  ${productModal ? ('modal') : ('off')}`} >
            <div className="wrapper">
                <div className="boxes" >
                    <div className="box">
                        <form action="#" className="form" onSubmit={handleSubmit}>
                            <h3 className="heading">Add a new category</h3>
                            <label htmlFor="#">
                                <input type="text" name="name" placeholder="Category" onChange={(e)=>{setName(e.target.value)}} />
                            </label>

                            <label htmlFor="#">
                                <input type="text" name="sub" placeholder="Sub Category" onChange={(e)=>{setSubcategory(e.target.value)}} />
                            </label>

                            <label htmlFor="#">
                                <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Category Description" onChange={(e)=>{setDesc(e.target.value)}}></textarea>
                            </label>

                            <label htmlFor="#">
                            <Button btnText={isSubmitting ? 'Uploading..' : 'Add Category'} />
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