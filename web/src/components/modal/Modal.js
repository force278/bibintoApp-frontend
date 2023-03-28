import react from "react";

import "./Modal.css"

const Modal = ({active, setActive, children})=> {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content active" : "modal_content"}>
                {children}
            </div>
        </div>
    )
}

export default Modal;