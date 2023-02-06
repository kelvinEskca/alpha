import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
const HeroModal = ({heroModal,openModal}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        cta:"",
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
        const data = new FormData();
        data.append("title", formData.title);
        data.append("subtitle", formData.subtitle);
        data.cta("subtitle", formData.cta);
        for (let i = 0; i < formData.videos.length; i++) {
            data.append("video", formData.videos[i]);
        }
        try {
            const res = await axios.post("https://alphaapi-production.up.railway.app/alphaapi/hero", data,{headers:{token:token}});
            if(res.status === 200){
                alert(res.statusText);
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

                            <label htmlFor="#">Hero Video
                                <input type="file" name="video" placeholder="Video" onChange={handleVideoChange} multiple/>
                            </label>


                            <label htmlFor="#">
                                <Button btnText={'Add Section'} />
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
 
export default HeroModal;