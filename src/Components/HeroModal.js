import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
const HeroModal = ({heroModal,openModal}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        cta:"",
        ctatwo:"",
        category:"",
        videos: [],
    });
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleVideoChange = e => {
        setFormData({ ...formData, videos: e.target.files });
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
        for (let i = 0; i < formData.videos.length; i++) {
            data.append("video", formData.videos[i]);
        }
        try {
            const res = await axios.post("http://localhost:5000/alphaapi/hero", data,{headers:{token:token}});
            if(res.status === 200){
                alert(res.statusText);
                setIsSubmitting(false);
                navigate('/settings');
            }
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <section className={`section addressModal  ${heroModal ? ('modal') : ('off')}`} >
            <div className="wrapper">
                <div className="boxes" >
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

                            <label htmlFor="#">Hero Video
                                <input type="file" name="video" placeholder="Video" onChange={handleVideoChange} multiple/>
                            </label>

                            <label htmlFor="#">Content Category
                                <input type="text" name="category" placeholder="Category" onChange={handleChange} value={formData.category}/>
                            </label>

                            <label htmlFor="#">
                                <Button btnText={isSubmitting ? 'Uploading..' : 'Add Section'} />
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
 
export default HeroModal;