import { Link } from "react-router-dom";
import Button from '../Components/Button'
const SupportHeader = ({link,linkto,heading}) => {
    return (
        <div className="box">
            <span>
                <Link>VELONTE Athletrics US</Link>
                <p className="paragraph"></p>
                <Link to={linkto}>{link}</Link>
            </span>

            <div className="hero-box">
                <h3 className="heading">{heading}</h3>
                <Link to='#'><Button btnText={'Follow'}/></Link>
            </div>
        </div>
    );
}
 
export default SupportHeader;