import { Link } from "react-router-dom";
import Button from "./Button";
import { useLocation } from 'react-router-dom';
import React,{useEffect} from "react";
const SupportHeader = ({supportclass}) => {
    let location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return (
        <div className={`support-header ${supportclass}`}>
            <Link to='/'><img src="../images/35e1276de04b951ddc8cfb2b491652d7124ea19d.png" alt="35e1276de04b951ddc8cfb2b491652d7124ea19d" /></Link>

            <aside>
                <Link to='#'><Button btnText={"Submit a request"} /></Link>
                <Link to='#'><Button btnText={"Sign in"} /></Link>
            </aside>
        </div>
    );
}
 
export default SupportHeader;