import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import CartContext from "../CartContext";
import baseUrl from "../config/config.js";
import { v4 as uuidv4 } from 'uuid';

const AddressPopUp = ({addressPop,addressPopUp}) => {
    const {items,getTotalAmount,getShipping} = useContext(CartContext);
    axios.defaults.withCredentials = true;
    const [isChecked, setIsChecked] = useState(true);
    const [email,setEmail] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const clearCartFromLocalStorage = () => {
        localStorage.removeItem('cart');
    };
    function handleToggle() {
        setIsChecked(!isChecked);
    }

    let totalAmount = 0;

    if(isChecked === true){
        totalAmount = 0;
    }
    else{
        totalAmount = getShipping() - getTotalAmount();
    }

    const userId = user === null ? uuidv4() : user._id;

    const makePayment = async (e) =>{
        e.preventDefault();
        setIsSubmitting(true);
        let paymentEmail;
        if (user !== null) {
            paymentEmail = user.email;
            console.log(paymentEmail);
        }
        else{
            paymentEmail = email;
            console.log(paymentEmail);
        }
        try{
            clearCartFromLocalStorage();
            const response = await axios.post(`${baseUrl.baseUrl}/alphaapi/pay/create-checkout-session`,{
                items:items,
                userId:userId,
                email:paymentEmail,
                total:totalAmount

            })
            if(response.data.url){
                setIsSubmitting(false);
                window.location.href = response.data.url;
            }
        }
        catch(error){
            setIsSubmitting(false);
        }
    
    }
    return (
        <section className={`section modal addresspop  ${addressPop ? ('modaloff') : ('')}`} >
        <div className="wrapper">
            <Link to={'/'}><img src={'images/logo.png'} alt="logo" className="logo" /></Link>
            <div className="boxes">
                <div className="box">
                    {items.length === 0 ? (
                        ""
                    ) : (
                        
                        <div className="border-container">
                            {items.map((item,i)=>{
                                return (
                                    <div className="border-box" key={i}>
                                        <div className="top">
                                            <div className="top-left">
                                                <h3 className="heading">${item.price}</h3>
                                            </div>

                                            <div className="top-right">
                                            { 'color' in item && item.color !== "" ? (
                                            <img src={`${item.color}`} alt={item.color} />
                                            ) : (
                                            <img src={`${item.colors}`} alt={item.colors} />
                                            )}
                                            <div class="rowright">
                                                <h3 className="heading">{item.name}</h3>
                                                <p className="paragraph">{item.size}</p>
                                            </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                            
                        </div>
                        
                    )}
                    {items.length === 0 ? (
                        ""
                    ):(
                        <div className="info-container">
                            <div className="rowOne">
                                <div className="total-banner">
                                    <span>
                                        {items.length > 1 ? (<h3 className="heading">Item Total: <span>{items.length}</span></h3>) : (<h3 className="heading">Item Total: <span>{items.length}</span></h3>)}
                                    </span>
                                    <span>
                                        <h3 className="heading">Shipping:<span>{isChecked ? ("Free"):(<>
                                        ${getShipping() - getTotalAmount()}</>)}</span></h3>
                                    </span>
                                    
                                </div>
                                <div className="total-banner">
                                    <span>
                                        <h3 className="small-heading">SubTotal: <span>${getTotalAmount()}</span></h3>
                                        
                                    </span>
                                    <span>
                                        <h3 className="heading">Total: <span>{isChecked ? (`$${getTotalAmount()}`):(`$${getShipping()}`)}</span></h3>
                                    </span>
                                </div>
                            </div>
                            <div className={`rowMajor majorFirst ${isChecked ? ' checked' : ''}`}>
                                <span className={`note-span check-span `}>
                                    <input type="checkbox" checked={isChecked} onChange={handleToggle} />
                                    <small>Free shipping</small>
                                </span>
                            </div>
                            <div className={`rowMajor ${isChecked ? 'off' : ''}`}>
                                <span className="note-span">
                                    <small>$25 for items greater than 10</small>
                                    <small>$15 for items less than 10</small>
                                </span>
                            </div>
                        </div>
                    )}
                    
                </div>

                <div className="box">
                    <form className="form">
                        <div className="toprow">
                            <h3 className="heading">Contact Information</h3>
                            {user === null ? (<span>Already have an account? <Link to={'/login'}>Login</Link></span>) : ("")}
                        </div>
                        
                        {user === null ? (
                            <label>
                                <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required />
                            </label>
                        ):("")}
                        

                        <div className="popbottom">
                            <p className="paragraph" onClick={addressPopUp}>&#x2190; Return to cart</p>
                            <button onClick={makePayment}>{isSubmitting ? 'Processing..' : 'Proceed To Payment'}</button>
                        </div>
                    </form>
                </div>

                
            </div>
        </div>
        </section>
    );
}
 
export default AddressPopUp;