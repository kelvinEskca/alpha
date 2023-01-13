import SupportHero from '../Components/SupportHero';
import SupportFooter from '../Components/SupportFooter';
import SupportHeader from '../Components/SupportHeader';
const Support = () => {
    return (
        <>
            <SupportHeader />
            <main className="main support-main">
                <section className="section support">
                    <div className="wrapper">
                        <div className="boxes">
                            <SupportHero link={'Returns & Exchange'} heading={'Return / exchange policy'}/>
                        </div>
                    </div>
                </section>

                <section className="section policy">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
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
 
export default Support;