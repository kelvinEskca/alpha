import SupportHero from '../Components/SupportHero';
import SupportFooter from '../Components/SupportFooter';
import SupportHeader from '../Components/SupportHeader';
const Contact = () => {
    return (
        <>
            <SupportHeader />
            <main className="main support-main">
                <section className="section support">
                    <div className="wrapper">
                        <div className="boxes">
                            <SupportHero link={'Submit a request'} heading={'Submit a request'}/>
                        </div>
                    </div>
                </section>

                <section className="section policy form-policy">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                            <form action="#">
                                <label htmlFor="#">Please select from one of the categories below:
                                    <select name="catgeories" id="categoreis">
                                        <option value="General Questions">General Questions</option>
                                        <option value="General Questions">General Questions</option>
                                        <option value="General Questions">General Questions</option>
                                        <option value="General Questions">General Questions</option>
                                        <option value="General Questions">General Questions</option>
                                        <option value="General Questions">General Questions</option>
                                        <option value="General Questions">General Questions</option> 
                                    </select>
                                </label>
                            </form>
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
 
export default Contact;