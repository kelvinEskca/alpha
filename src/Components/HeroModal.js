import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../config/config.js";
import AlertModal from "./AlertModal";
const HeroModal = ({heroModal,openModal,hero,setHero}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        cta:"",
        ctatwo:"",
        category:"",
        images: [],
    });
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageChange = e => {
        setFormData({ ...formData, images: e.target.files });
        console.log(formData.images)
    };
    
    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        const data = new FormData();
        data.append("title", formData.title);
        data.append("subtitle", formData.subtitle);
        data.append("cta", formData.cta);
        data.append("ctatwo", formData.ctatwo);
        data.append("category", formData.category);
        for (let i = 0; i < formData.images.length; i++) {
            data.append("image", formData.images[i]);
        }
        
        try {
            const res = await axios.post(`${baseUrl.baseUrl}/alphaapi/hero`, data,{headers:{token:token}});
            if(res.status === 200){
                const newHero = res.data.product;
                setHero([...hero, newHero]);
                setIsSubmitting(false);
                setAlertText("Hero Section Uploaded Successfully!");
                setIsSuccessModalOpen(true);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
                setIsSubmitting(false);
                navigate('/settings');
            }
            else{
                setAlertText("Hero Section Not Uploaded Successfully!");
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
        <section className={`section addressModal modal  ${heroModal ? ('modal modaloff') : ('')}`} >
            <div className="wrapper">
                <div className="boxes" onClick={handleSectionClick}>
                    <div className="box">
                        <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <h3 className="heading">Add a new hero section</h3>
                            <label htmlFor="#">Hero Title
                                <input type="text" name="title" placeholder="Hero title" onChange={handleChange} value={formData.title}/>
                            </label>

                            <label htmlFor="#">Hero Subtitle
                                <textarea name="subtitle" id="subtitle" cols="30" rows="10" placeholder="Hero Subtitle" onChange={handleChange} value={formData.subtitle}></textarea>
                            </label>

                            <label htmlFor="#">Hero CTA
                                <input type="text" name="cta" placeholder="CTA" onChange={handleChange} value={formData.cta}/>
                            </label>

                            <label htmlFor="#">Hero CTA 2 (Optional)
                                <input type="text" name="ctatwo" placeholder="CTA Two" onChange={handleChange} value={formData.ctatwo}/>
                            </label>

                            <label htmlFor="#">Hero Image
                                <input type="file" name="image" placeholder="Image" onChange={handleImageChange} multiple/>
                            </label>


                            <label htmlFor="#">Content Category
                                <input type="text" name="category" placeholder="Category" onChange={handleChange} value={formData.category}/>
                            </label>

                            <label htmlFor="#">
                                <button>{isSubmitting ? 'Uploading..' : 'Add Section'}</button>
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
 
export default HeroModal;