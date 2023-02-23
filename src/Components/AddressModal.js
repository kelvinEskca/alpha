import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import Loader from "./Loader";

const AddressModal = ({addressModal,openModal}) => {
    axios.defaults.withCredentials = true;
    const [checkBox,setCheckBox] = useState(false);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    //add address;
    const [address,setAddress] = useState({fname:"",lname:"",email:"", company:"",addressOne:"",addressTwo:"",city:"",country:"", province:"",phone:"",postalcode:""});

    const handleToggle = ()=>{
        setCheckBox(checkBox => !checkBox);
        console.log(checkBox);
    }
    const handleChange = (e) =>{
        e.preventDefault();
        setAddress({...address,[e.target.name]: e.target.value})
    }
    const addAddress = async (e) =>{
        e.preventDefault();
        if(address !== ''){
            try{
                const result = await axios.post('http://localhost:5000/alphaapi/address',{
                    fname:address.fname,
                    lname:address.lname,
                    email:user.email,
                    company:address.company,
                    addressOne:address.addressOne,
                    addressTwo:address.addressTwo,
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
                    alert("Address updated successfuly");
                    setLoading(false);
                    navigate('/account')
                    localStorage.setItem('address',JSON.stringify(result.data));
                }
                else{
                    alert("Address failed to upload successfuly")
                }
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            alert('Ensure All inputs are filled!');
        }
    }
    if(loading) return <Loader />;
    return (
        <section className={`section addressModal  ${addressModal ? ('modal') : ('off')}`} >
            <div className="wrapper">
                <div className="boxes" >
                    <div className="box">
                        <form action="#" className="form" onSubmit={addAddress}>
                            <h3 className="heading">Add a new address</h3>
                            <div className="row-label">
                                <label htmlFor="#">First Name 
                                    <input type="text" id="fname" name="fname" onChange={handleChange}/>
                                </label>

                                <label htmlFor="#">Last Name 
                                    <input type="text" id="lname" name="lname" onChange={handleChange}/>
                                </label>
                            </div>
                            <label htmlFor="#" style={{display:'none'}}> 
                                <input type="email" id="email" name="email" onChange={handleChange}/>
                            </label>

                            <label htmlFor="#">Company 
                                <input type="text" id="company" name="company" onChange={handleChange}/>
                            </label>

                            <label htmlFor="#">Address1 
                                <input type="text" id="address1" name="addressOne" onChange={handleChange}/>
                            </label>

                            <label htmlFor="#">Address2 
                                <input type="text" id="address2" name="addressTwo" onChange={handleChange}/>
                            </label>

                            <div className="row-label">
                                <label htmlFor="#">City 
                                    <input type="text" id="city" name="city" onChange={handleChange}/>
                                </label>

                                <label htmlFor="#">Country 
                                    <input type="text" id="country" name="country" onChange={handleChange}/>
                                </label>
                            </div>

                            <div className="row-label">
                                <label htmlFor="#">Province 
                                    <input type="text" id="province" name="province" onChange={handleChange}/>
                                </label>

                                <label htmlFor="#">Postal/Zip Code 
                                    <input type="text" id="postcode" name="postalcode" onChange={handleChange}/>
                                </label>
                            </div>

                            <label htmlFor="#">Phone 
                                <input type="phone" id="phone" name="phone" onChange={handleChange}/>
                            </label>

                            <label htmlFor="#" className="checklabel">
                                <input type="checkbox" className="check" name="checkStatus" id="checkStatus" value={checkBox ? "true" : "false"} onChange={handleToggle}/>
                                <p className="paragraph">Set as default address</p>
                            </label>

                            <label htmlFor="#">
                                <Button btnText={'Add Address'} />
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
 
export default AddressModal;