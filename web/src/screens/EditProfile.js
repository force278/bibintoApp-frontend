import React from 'react'
import "../sass/common.scss";
import { NavLink } from 'react-router-dom';

export const EditProfile = ({children})  => {
    return (
        <div className="border-1 border bg-white w-100 container" style={{marginTop: '32px', borderRadius: '6px'}}>
            <div className="row h-100">
                <div className="col-sm-12 col-lg-4 border-1 border-end">
                    <div className="pt-3 pb-3 position-relative ps-5">
                        <span className="fs-6 fw-medium" style={{fontFamily: "Roboto, sans-serif"}}>
                            <NavLink to="/accountEditProfile" activeClassName="active_profile">Редактировать профиль</NavLink>
                        </span>
                    </div>
                    <div className="pt-3 pb-3 position-relative ps-5 hideElement">
                        <span className="fs-6 fw-medium" style={{fontFamily: "Roboto, sans-serif"}}>
                            <NavLink to="/account/accountChangePassword" activeClassName="active_profile">Поменять пароль</NavLink>
                        </span>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}
