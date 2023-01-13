const Button = ({btnText,btntheme}) => {
    return (
        <button className={`button ${btntheme}`}>{btnText}</button>
    );
}
 
export default Button;