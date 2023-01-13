import { Link } from "react-router-dom";
import Button from "./Button";

const SupportHeader = ({supportclass}) => {
    return (
        <div className={`support-header ${supportclass}`}>
            <img src="../images/35e1276de04b951ddc8cfb2b491652d7124ea19d.png" alt="35e1276de04b951ddc8cfb2b491652d7124ea19d" />

            <aside>
                <Link to='#'><Button btnText={"Submit a request"} /></Link>
                <Link to='#'><Button btnText={"Sign in"} /></Link>
            </aside>
        </div>
    );
}
 
export default SupportHeader;