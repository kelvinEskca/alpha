import React,{useState} from "react";
import Button from "./Button";
import axios from "axios";
import baseUrl from "../config/config.js";
import AlertModal from "./AlertModal";
const CardModal = ({cardModal,openCard,cards,setCards}) => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        cta: "",
        ctatwo: "",
        category: "",
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
            const res = await axios.post(`${baseUrl.baseUrl}/alphaapi/card`, data,{headers:{token:token}});
            if(res.status === 200){
                const newCard = res.data.product;
                setCards([...cards, newCard]);
                setIsSubmitting(false);
                setAlertText(res.statusText);
                setIsSuccessModalOpen(true);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
                setIsSubmitting(false);
            }
            else{
                setAlertText("Card Section Not Uploaded Successfully!");
                setIsSuccessModalOpen(true);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
                setIsSubmitting(false);
            }
        } catch (err) {
        console.error(err);
        }
    };

    const handleSectionClick = (e) => {
        if (e.target === e.currentTarget) {
            openCard();
        }
    }

    return (
        <>
            <section className={`section addressModal modal  ${cardModal ? ('modal modaloff') : ('')}`} >
                <div className="wrapper">
                    <div className="boxes" onClick={handleSectionClick}>
                        <div className="box">
                            <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                                <h3 className="heading">Add a new card section</h3>
                                <label htmlFor="#">Card Title
                                    <input type="text" name="title" placeholder="Card title" onChange={handleChange} value={formData.title}/>
                                </label>

                                <label htmlFor="#">Card Subtitle
                                    <textarea name="subtitle" id="subtitle" cols="30" rows="10" placeholder="Card Subtitle" onChange={handleChange} value={formData.subtitle}></textarea>
                                </label>

                                <label htmlFor="#">Card CTA
                                    <input type="text" name="cta" placeholder="CTA" onChange={handleChange} value={formData.cta}/>
                                </label>

                                <label htmlFor="#">Card CTA 2 (Optional)
                                    <input type="text" name="ctatwo" placeholder="CTA Two" onChange={handleChange} value={formData.ctatwo}/>
                                </label>

                                <label htmlFor="#">Content Category
                                    <input type="text" name="category" placeholder="Category" onChange={handleChange} value={formData.category}/>
                                </label>

                                <label htmlFor="#">Card Image
                                    <input type="file" name="image" placeholder="Image" onChange={handleImageChange} multiple/>
                                </label>

                                <label htmlFor="#">
                                    <Button btnText={isSubmitting ? 'Uploading..' : 'Add Section'} />
                                </label>

                                <label htmlFor="#">
                                    <button type="button" onClick={openCard}>Cancel</button>
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
 
export default CardModal;