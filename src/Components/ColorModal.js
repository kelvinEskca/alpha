import React,{useState} from "react";
import { useNavigate,useParams } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import AlertModal from "./AlertModal";
import baseUrl from "../config/config.js";
const ColorModal = ({colorModal,openModal}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const {id} = useParams();
    
    const [formData, setFormData] = useState({
        name: "",
        images: [],
        productId:"",
        
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
        const data = new FormData();
        data.append("colorName", formData.name);
        data.append("productId", id);
        for (let i = 0; i < formData.images.length; i++) {
            data.append("image", formData.images[i]);
        }
        try {
            const res = await axios.post(`${baseUrl.baseUrl}/alphaapi/color`, data,{headers:{token:token}});
            if(res.status === 200){
                setIsSuccessModalOpen(true);
                setAlertText("Card Deleted Successfully!");
                setIsSubmitting(false);
                navigate(`/details/${id}`);
            }
        } catch (err) {
        console.error(err);
        }

        console.log(data);
    };

    return (
        <>
            <section className={`section addressModal  ${colorModal ? ('modal') : ('off')}`} >
            <div className="wrapper">
                <div className="boxes" >
                    <div className="box">
                        <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <h3 className="heading">Add a new product image</h3>
                            <label htmlFor="#">Color Name
                                <input type="text" name="name" placeholder="Color name" onChange={handleChange} value={formData.name}/>
                            </label>

                            <label htmlFor="#">Color Image
                                <input type="file" name="images" placeholder="Images" onChange={handleImageChange} multiple/>
                            </label>

                            <label htmlFor="#">
                                <Button btnText={isSubmitting ? 'Uploading..' : 'Add Image'} />
                            </label>

                            <label htmlFor="#">
                                <button type="button" onClick={openModal}>Cancel</button>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
        </>
    );
}
 
export default ColorModal;