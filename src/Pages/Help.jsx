import SupportFooter from '../Components/SupportFooter';
import Button from '../Components/Button';
import Input from '../Components/Input';
import SupportHeader from '../Components/SupportHeader';
import useScrollPosition from '../Components/Scroll';
import React,{useState} from 'react';
import { useEffect } from 'react';
const Help = () => {
    const scrollPosition = useScrollPosition();
    const [nav,setNav] = useState(false);

    useEffect(()=>{
        if(scrollPosition > 100){
            setNav(true)
        }
        else{
            setNav(false)
        }
    },[scrollPosition])
    return (
        <>
            <SupportHeader supportclass={nav ? ('') : ('transparent')} />
            <main className="main help-main">
                <section className="section cant">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">How can we help? </h3>
                                <form action="#">
                                    <label htmlFor="#"><Input type={'text'} placeholder={'Search key words here...'} /></label>
                                    <Button btnText={'Search'} />
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section policy">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Lorem ipsum dolor.</h3>
                                <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea delectus voluptates exercitationem et iste animi necessitatibus, veritatis commodi vel sequi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque nihil modi numquam dignissimos quo quaerat fuga illum distinctio nobis optio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore aut delectus facere exercitationem. Natus enim debitis vero quia error deserunt.</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Lorem ipsum dolor.</h3>
                                <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea delectus voluptates exercitationem et iste animi necessitatibus, veritatis commodi vel sequi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque nihil modi numquam dignissimos quo quaerat fuga illum distinctio nobis optio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore aut delectus facere exercitationem. Natus enim debitis vero quia error deserunt.</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Lorem ipsum dolor.</h3>
                                <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea delectus voluptates exercitationem et iste animi necessitatibus, veritatis commodi vel sequi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque nihil modi numquam dignissimos quo quaerat fuga illum distinctio nobis optio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore aut delectus facere exercitationem. Natus enim debitis vero quia error deserunt.</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Lorem ipsum dolor.</h3>
                                <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea delectus voluptates exercitationem et iste animi necessitatibus, veritatis commodi vel sequi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque nihil modi numquam dignissimos quo quaerat fuga illum distinctio nobis optio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore aut delectus facere exercitationem. Natus enim debitis vero quia error deserunt.</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Lorem ipsum dolor.</h3>
                                <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea delectus voluptates exercitationem et iste animi necessitatibus, veritatis commodi vel sequi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque nihil modi numquam dignissimos quo quaerat fuga illum distinctio nobis optio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore aut delectus facere exercitationem. Natus enim debitis vero quia error deserunt.</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Lorem ipsum dolor.</h3>
                                <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea delectus voluptates exercitationem et iste animi necessitatibus, veritatis commodi vel sequi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque nihil modi numquam dignissimos quo quaerat fuga illum distinctio nobis optio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore aut delectus facere exercitationem. Natus enim debitis vero quia error deserunt.</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Lorem ipsum dolor.</h3>
                                <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea delectus voluptates exercitationem et iste animi necessitatibus, veritatis commodi vel sequi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque nihil modi numquam dignissimos quo quaerat fuga illum distinctio nobis optio. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore aut delectus facere exercitationem. Natus enim debitis vero quia error deserunt.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="support-footer">
                <SupportFooter />
            </footer>
        </>
    );
}
 
export default Help;