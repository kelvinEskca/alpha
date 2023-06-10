import SupportHero from '../Components/SupportHero';
import SupportHeader from '../Components/SupportHeader';
import baseUrl from "../config/config.js";
import axios from 'axios';
import { useEffect,useState } from 'react';
import Modal from '../Components/Modal';
import MobileNav from '../Components/MobileNav';
import AlertModal from '../Components/AlertModal';
import Footer from '../Components/Footer';
const Support = () => {

    axios.defaults.withCredentials = true;
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const [loading,setLoading] = useState(true);
    const [stats,setStats] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');

    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    useEffect(()=>{
        setLoading(false);
    },[]);

    const [formData, setFormData] = useState({
        email: "",
        type: "",
        subject: "",
        description: "",
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageChange = e => {
        setFormData({ ...formData, image: e.target.files });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if(formData.email === ''  || formData.type === '' || formData.description === '' || formData.subject === ''){
            alert('Please ensure all fields are filled');
        }
        else{
            const data = new FormData();
            data.append("email", formData.email);
            data.append("type", formData.type);
            for (let i = 0; i < formData.image.length; i++) {
                data.append("image", formData.image[i]);
            }
            data.append("subject", formData.subject);
            data.append("description", formData.description);
            try{
                setIsSubmitting(true)
                const contactSubmit = await axios.post(`${baseUrl.baseUrl}/alphaapi/support`,data);
                setLoading(true);
                
                if(contactSubmit.status === 201){
                    setIsSuccessModalOpen(true);
                    setAlertText("Support Message Sent Successfully!");
                    setLoading(false);
                    setIsSubmitting(false);
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000)
                }
                else{
                    setLoading(false);
                    setIsSuccessModalOpen(true);
                    setAlertText("Contact Message Failed to send!");
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000);
                }
            }
            catch(err){
                setLoading(false);
                setIsSubmitting(false);
                setIsSuccessModalOpen(true);
                setAlertText("Contact Message Failed to send!");
                if (err.response && err.response.status === 500) {
                    setStats(err.response.data);
                    setTimeout(()=>{
                        setStats('');
                        setIsSuccessModalOpen(false);
                    },3000)
                }
            }
        }
    }
    return (
        <>
            <SupportHeader />
            <main className="main support-main">
                <section className="section support">
                    <div className="wrapper">
                        <div className="boxes">
                            <SupportHero heading={'Ticket'}/>
                        </div>
                    </div>
                </section>

                <section className="section policy form-policy">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <label htmlFor="#">Your Email Address:
                                        <input type="email" name='email' onChange={handleChange}value={formData.email} required />
                                    </label>

                                    <label htmlFor="#">Request Type:
                                        <input type="text" name='requesttype' onChange={handleChange} value={formData.type} required />
                                    </label>

                                    <label htmlFor="#">Subject:
                                        <input type='text' onChange={handleChange} value={formData.subject} required/>
                                    </label>

                                    <label htmlFor="#">Description:
                                        <textarea name="descritpion" id="description" cols="30" rows="10" onChange={handleChange} value={formData.description} required></textarea>
                                    </label>

                                    <label htmlFor='#'>Attatchements
                                        <input type="file" name="image" id="image" onChange={handleImageChange} multiple/>
                                    </label>

                                    <label htmlFor="#">{stats === '' ? (<button>{isSubmitting ? 'Processing..' : 'Submit'}</button>) : (<button>{isSubmitting ? 'Processing..' : stats}</button>)}</label>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <Modal modal={modal} handleModal={handleModal} />

                <MobileNav mobile={mobile} handleMobile={handleMobile} />

                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
            </main>

            <Footer />
        </>
    );
}
 
export default Support;