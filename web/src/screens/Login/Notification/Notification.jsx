import React from "react";

import s from './Notification.module.css'


const Notification = ({location}) =>{

    return (
        <div className={s.notification}>
        {location?.state?.message}
        </div>
    )
}

export default Notification;