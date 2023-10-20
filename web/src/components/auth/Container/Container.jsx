import React from "react";
import s from "./Container.module.css"
import Wrapper from "../Wrapper/Wrapper";
import Footer from "../Footer/Footer";
const Container = ({children}) => {
    return (
        <div className={s.container}>
            <Wrapper children={children} />
            <Footer/>
        </div>
    )

}

export default Container;