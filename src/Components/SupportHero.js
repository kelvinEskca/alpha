import { Link } from "react-router-dom";
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
            </div>
        </div>
    );
}
 
export default SupportHeader;