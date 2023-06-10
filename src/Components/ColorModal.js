import React,{useState} from "react";
import { useNavigate,useParams } from "react-router-dom";
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
            const res = await axios.put(`${baseUrl.baseUrl}/alphaapi/product/update/${id}`, data,{headers:{token:token}});
            if(res.status === 200){
                setIsSuccessModalOpen(true);
                setAlertText("Color Image addedd Successfully!");
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
                setIsSubmitting(false);
                navigate(`/details/${id}`);
            }
            else{
                setAlertText("Color Image Not addedd Successfully!");
                setIsSuccessModalOpen(true);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
                setIsSubmitting(false);
            }
        } 
        catch (err) {
            console.error(err);
        }
    };

    const handleSectionClick = (e) => {
        if (e.target === e.currentTarget) {
            openModal();
        }
    }

    return (
        <>
            <section className={`section addressModal modal  ${colorModal ? ('modaloff') : ('')}`} >
            <div className="wrapper">
                <div className="boxes" onClick={handleSectionClick} >
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
                                <button>{isSubmitting ? 'Uploading..' : 'Add Image'}</button>
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