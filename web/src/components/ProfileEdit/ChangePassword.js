import React from "react";
import "../../sass/common.scss";

export const ChangePassword = () => {
    return (
        <>
            <div className="col-8">
                <div className="row mt-2">
                    <div className="d-flex mb-3 align-items-center">
                        <div className="col-3 d-flex ">
                            <span className="fs-6 " style={{fontFamily: "Roboto, sans-serif"}}>Старый пароль</span>
                        </div>
                        <div className="col-9 ps-4">
                            <input style={{minWidth:'355px'}} type="text" placeholder="Введите старый пароль" value="" onChange={(e) => e.target.value } className="border border-1 pt-1 pb-1 ps-2 w-50" />
                        </div>
                    </div>
                    <div className="d-flex mb-3 align-items-center">
                        <div className="col-3 d-flex ">
                            <span className="fs-6 " style={{fontFamily: "Roboto, sans-serif"}}>Новый пароль</span>
                        </div>
                        <div className="col-9 ps-4">
                            <input style={{minWidth:'355px'}} type="text" placeholder="Введите новый пароль" value="" onChange={(e) => e.target.value }  className="border border-1 pt-1 pb-1 ps-2 w-50" />
                        </div>
                    </div>
                    <div className="d-flex mb-3 align-items-center">
                        <div className="col-3 d-flex ">
                            <span className="fs-6 " style={{fontFamily: "Roboto, sans-serif"}}>Повторите пароль</span>
                        </div>
                        <div className="col-9 ps-4">
                            <input type="text" style={{minWidth:'355px'}} placeholder="Повторите пароль" value="" onChange={(e) => e.target.value }  className="border border-1 pt-1 pb-1 ps-2 w-50" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center" style={{marginTop: '29px'}}>
                        <button className="text-white border-0 change_btn" style={{borderRadius: "4px", background: "#2283F5", padding: "8px 17px", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}}>Изменить</button>
                    </div>
                </div>
            </div>
        </>
    );
};