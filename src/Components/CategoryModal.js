import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
const ProductModal = ({productModal,openModal}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');
    const [subcategory,setSubcategory] = useState('');
   
    
    const handleSubmit = async e => {
        e.preventDefault();
        if(name === ''  || desc === '' || subcategory === ''){
            alert('Please ensure all fields are filled');
        }
        else{
            try {
                const res = await axios.post("https://api-production-f7f8.up.railway.app/alphaapi/category",{
                    name:name,
                    desc:desc,
                    subcategory:subcategory
                },{headers:{token:token}});
                console.log(res);
                if(res.status === 200){
                    navigate('/category')
                }
            } catch (err) {
            console.error(err);
            }
        }
    };
    
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
                                <Button btnText={'Add Category'} />
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