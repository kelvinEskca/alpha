import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
const Login = () => {
    axios.defaults.withCredentials = true;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const loginUser = await axios.post('http://localhost:5000/alphaapi/auth/login',{
                email:email,
                password:password
            });
            if(loginUser.status === 200){
                localStorage.setItem("token", loginUser.data.accessToken);
                localStorage.setItem("user",JSON.stringify(loginUser.data));
                if(loginUser.data.isAdmin === false){
                    navigate('/account');
                }
                else{
                    navigate('/dashboard');
                }
            }
            else{
                console.log(loginUser.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <Header />
            <main className="main">
                <section className="section auth">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Log Into My Account</h3>
                                <form action="#" className="form" onSubmit={handleSubmit}>
                                    <label htmlFor="#">Email Address
                                        <input type="email" name="email" id="email" onChange={(e)=>{
                                            setEmail(e.target.value);
                                        }}/>
                                    </label>

                                    <label htmlFor="#">Password
                                        <input type="password" name="password" id="password" onChange={(e)=>{
                                            setPassword(e.target.value);
                                        }}/>
                                    </label>

                                    <label htmlFor="#" className="center-label">
                                        <Link to='/forget'>Forgot Password?</Link>
                                    </label>

                                    <label htmlFor="#">
                                        <Button btnText={'Log In'} />
                                    </label>

                                    <label htmlFor="#" className="center-label">
                                        <span>New to Alphalete <Link to='/register'>Create An Account</Link></span>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
        
    );
}
 
export default Login;