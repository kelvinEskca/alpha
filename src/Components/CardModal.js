import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
const CardModal = ({cardModal,openCard}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        cta: "",
        images: [],
    });
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageChange = e => {
        setFormData({ ...formData, images: e.target.files });
    };
    
    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("subtitle", formData.subtitle);
        data.append("cta", formData.cta);
        for (let i = 0; i < formData.images.length; i++) {
            data.append("image", formData.images[i]);
        }
        try {
            const res = await axios.post("https://api-production-f7f8.up.railway.app/alphaapi/card", data,{headers:{token:token}});
            if(res.status === 200){
                alert(res.statusText);
                navigate('/settings');
            }
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <section className={`section addressModal  ${cardModal ? ('modal') : ('off')}`} >
            <div className="wrapper">
                <div className="boxes" >
                    <div className="box">
                        <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <h3 className="heading">Add a new card section</h3>
                            <label htmlFor="#">Card Title
                                <input type="text" name="title" placeholder="Card title" onChange={handleChange} value={formData.title}/>
                            </label>

                            <label htmlFor="#">Card Subtitle
                                <textarea name="subtitle" id="subtitle" cols="30" rows="10" placeholder="Card Subtitle" onChange={handleChange} value={formData.title}></textarea>
                            </label>

                            <label htmlFor="#">Card CTA
                                <input type="text" name="cta" placeholder="CTA" onChange={handleChange} value={formData.cta}/>
                            </label>

                            <label htmlFor="#">Card mage
                                <input type="file" name="image" placeholder="Image" onChange={handleImageChange} multiple/>
                            </label>

                            <label htmlFor="#">
                                <Button btnText={'Add Section'} />
                            </label>

                            <label htmlFor="#">
                                <button onClick={openCard}>Cancel</button>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default CardModal;