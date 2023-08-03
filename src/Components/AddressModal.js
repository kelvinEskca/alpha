import React,{useState} from "react";
import axios from "axios";
import baseUrl  from "../config/config";

const AddressModal = ({addressModal,openModal,setAlertText,setIsSuccessModalOpen}) => {
    axios.defaults.withCredentials = true;
    const [checkBox,setCheckBox] = useState(false);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading,setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    //add address;
    const [address,setAddress] = useState({fname:"",lname:"",email:"",addressOne:"",city:"",country:"", province:"",phone:"",postalcode:""});

    const handleToggle = ()=>{
        setCheckBox(checkBox => !checkBox);
    }
    const handleChange = (e) =>{
        e.preventDefault();
        setAddress({...address,[e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('clicked');
        setIsSubmitting(true)
        if(address !== ''){
            try{
                const result = await axios.post(`${baseUrl.baseUrl}/alphaapi/address`,{
                    fname:address.fname,
                    lname:address.lname,
                    email:user.email,
                    addressOne:address.addressOne,
                    city:address.city,
                    country:address.country,
                    province:address.province,
                    phone:address.phone,
                    postalcode:address.postalcode,
                    checkStatus:checkBox,
                    userId:user._id
                },{ headers:{token:token} });
                setLoading(true);
                if(result.status === 200){
                    setIsSubmitting(false)
                    setAlertText("Address updated successfuly");
                    setLoading(false);
                    localStorage.setItem('address',JSON.stringify(result.data));
                    setTimeout(() => {
                        setIsSuccessModalOpen(false);
                    }, 5000);
                }
                else{
                    setAlertText("Address failed to upload successfuly")
                    setTimeout(() => {
                        setIsSuccessModalOpen(false);
                    }, 5000);
                }
            }
            catch(err){
                setLoading(false);
                setIsSubmitting(false);
                if (err.response && err.response.status === 401) {
                    setTimeout(() => {
                        setIsSuccessModalOpen(false);
                    }, 5000);
                }
            }
        }
        else{
            setAlertText('Ensure All inputs are filled!');
        }
    };

    const handleSectionClick = (e) => {
        if (e.target === e.currentTarget) {
            openModal();
        }
    }

    return (
        <section className={`section addressModal modal  ${addressModal ? ('modaloff') : ('')}`} >
            <div className="wrapper">
                <div className="boxes" onClick={handleSectionClick}>
                    <div className="box">
                        <form action="#" className="form" onSubmit={handleSubmit}>
                            <h3 className="heading">Add a new address</h3>
                            <div className="row-label">
                                <label htmlFor="#">First Name 
                                    <input type="text" id="fname" name="fname" onChange={handleChange} required/>
                                </label>

                                <label htmlFor="#">Last Name 
                                    <input type="text" id="lname" name="lname" onChange={handleChange} required/>
                                </label>
                            </div>

                            <label htmlFor="#">Address1 
                                <input type="text" id="address1" name="addressOne" onChange={handleChange} required/>
                            </label>

                            <div className="row-label">
                                <label htmlFor="#">City 
                                    <input type="text" id="city" name="city" onChange={handleChange} required/>
                                </label>

                                <label htmlFor="#">Country 
                                    <input type="text" id="country" name="country" onChange={handleChange} required/>
                                </label>
                            </div>

                            <div className="row-label">
                                <label htmlFor="#">Province 
                                    <input type="text" id="province" name="province" onChange={handleChange} required/>
                                </label>

                                <label htmlFor="#">Postal/Zip Code 
                                    <input type="text" id="postcode" name="postalcode" onChange={handleChange} required/>
                                </label>
                            </div>

                            <label htmlFor="#">Phone 
                                <input type="phone" id="phone" name="phone" onChange={handleChange} required/>
                            </label>

                            <label htmlFor="#" className="checklabel">
                                <input type="checkbox" className="check" name="checkStatus" id="checkStatus" value={checkBox ? "true" : "false"} onChange={handleToggle}/>
                                <p className="paragraph">Set as default address</p>
                            </label>

                            
                            <label htmlFor="#"><button type="submit">{isSubmitting ? 'Processing..' : 'Submit'}</button></label>
                           

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
 
export default AddressModal;