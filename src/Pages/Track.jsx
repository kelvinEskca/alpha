import React,{useState} from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import GlobeComponent from "../Components/GlobeComponent";
const Track = () => {
    axios.defaults.withCredentials = true;
    const [modal,setModal] = useState(false)
    const [mobile,setMobile] = useState(false)
    const [id,setId] = useState('');
    const [order,setOrder] = useState('');
    const [email,setEmail] = useState('');
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }
    
    
    const auth = '150VELON3377';
    const xml = `<TrackRequest USERID="${auth}"><TrackID ID="${id}"></TrackID></TrackRequest>`;
    const encodedXml = encodeURIComponent(xml);
    const url = "https://secure.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=" + encodedXml;
    const fetchData = async (e) =>{
        e.preventDefault();
        const result = await fetch(url, {
            method: 'GET',
            mode: 'no-cors',
        });
        const data = await result.text();
        console.log(data,result);
    }

    console.log(email,order)
   
    return (
        <>
        <Header handleModal={handleModal} handleMobile={handleMobile}/>
        <main className="main trackmain">
            <section className="section tracksection">
                <div className="wrapper">
                    <div className="boxes">
                        <div className="box">
                            <form action="#" className="form" onSubmit={fetchData}>
                                <label htmlFor="#">Order Number
                                    <input type="text" name="ordernumber" onChange={(e)=>{setOrder(e.target.value)}} />
                                </label>

                                <label htmlFor="#">Email Address
                                    <input type="text" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
                                </label>

                                <div className="or">
                                    <p className="paragraph">Or</p>
                                </div>

                                <label htmlFor="#">Tracking Number
                                    <input type="text" name="tracknumber" onChange={(e)=>{setId(e.target.value)}} />
                                </label>

                                <label htmlFor="#">
                                    <button>Track Your Order</button>
                                </label>
                            </form>
                        </div>

                        <GlobeComponent/>
                    </div>
                </div>
            </section>

            <Modal modal={modal} handleModal={handleModal} />
            <MobileNav mobile={mobile} handleMobile={handleMobile} />
        </main>
        <Footer/>
        </>
        
    );
}
 
export default Track;