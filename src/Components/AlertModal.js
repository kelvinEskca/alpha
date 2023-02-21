import React from 'react';
const AlertModal = ({alertText,isOpen})  => { 
    return (
        <div className={isOpen ? ("alert-modal show-alert") : ("alert-modal")}>
            <h2>{alertText}</h2>
        </div>
       
    );
}
 
export default AlertModal;