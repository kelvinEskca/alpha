const Toggle = ({toggleState,toggleTab}) => {
    return (
        <div className="box">
            <div className={`inner ${toggleState === 1 ? "active-button" : ""}`} onClick={() => toggleTab(1) }><small>Women's</small></div>
            <div className={`inner ${toggleState === 2 ? "active-button" : ""}`} onClick={() => toggleTab(2) }><small>Men's</small></div>
        </div>
    );
}
 
export default Toggle;