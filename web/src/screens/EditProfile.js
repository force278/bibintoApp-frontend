import React from 'react'
import { Link } from "react-router-dom";
import "../sass/common.scss";
import avatar from "../assets/img/editProfile/avatart.svg"
export const EditProfile = ()  => {
    return (
        <div className="border-1 border bg-white w-100 container" style={{height: "647px", marginTop: '32px'}}>
            <div className="row h-100">
                <div className="col-4 border-1 border-end">
                    <div className="pt-3 pb-3 position-relative ps-5">
                        <span className="fs-6 fw-medium" style={{fontFamily: "Roboto, sans-serif"}}>
                            <Link to="*" className="active_profile">Редактировать профиль</Link>
                        </span>
                    </div>
                    <div className="pt-3 pb-3 position-relative ps-5">
                        <span className="fs-6 fw-medium" style={{fontFamily: "Roboto, sans-serif"}}>
                            <Link to="/">Поменять пароль</Link>
                        </span>
                    </div>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="d-flex mb-3" style={{marginTop: "33px"}}>
                            <div className="col-2 d-flex justify-content-end">
                                <img src={avatar} style={{width:"38px", height: "38px", borderRadius: "50%"}} alt="avatar"/>
                            </div>
                            <div className="d-flex flex-column col-10 ps-4">
                                <span className="fs-5">alexeev</span>
                                <button className="text-primary bg-transparent border-0 d-flex justify-content-start">Загрузите новое фото</button>
                            </div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="col-2 d-flex justify-content-end">
                                <span className="fs-6 pt-2" style={{fontFamily: "Roboto, sans-serif"}}>Имя</span>
                            </div>
                            <div className="col-10 ps-4">
                            <input type="text" value="Yuri Alekseev" onChange={(e) => e.target.value } className="border border-1 pt-1 pb-1 ps-2 w-50" />
                                <div className="p-0 m-0 text-secondary">
                                    <div className="mt-2">Чтобы помочь людям найти вашу учетную запись, используйте имя, под которым вас знают.<br/></div>
                                    <div className="mt-3">Вы можете изменить свое имя только два раза в течение 7 дней.</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="col-2 d-flex justify-content-end">
                                <span className="fs-6 pt-2" style={{fontFamily: "Roboto, sans-serif"}}>Никнейм</span>
                            </div>
                            <div className="col-10 ps-4">
                                <input type="text" value="alexeev" onChange={(e) => e.target.value }  className="border border-1 pt-1 pb-1 ps-2 w-50" />
                                <div className="mt-2">
                                    <p className="text-secondary">Вы можете снова вернуть свой никнейм в течение <br/> 7 дней.</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-4">
                            <div className="col-2 d-flex justify-content-end">
                                <span className="fs-6 pt-2" style={{fontFamily: "Roboto, sans-serif"}}>Описание</span>
                            </div>
                            <div className="col-10 ps-4">
                                <textarea type="text" value="..." onChange={(e) => e.target.value } className="border border-1 pt-1 pb-1 ps-2 w-50 resize-none"/>
                                <div style={{marginTop: "32px"}}>
                                    <h5 className="fw-bold" style={{color: "#8E8E8E"}}>Персональная Информация</h5>
                                    <div className="mt-3" style={{color: "#8E8E8E"}}>Эта информация не будет видна в вашем общедоступном <br/> профиле.</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="col-2 d-flex justify-content-end">
                                <span className="fs-6 pt-2" style={{fontFamily: "Roboto, sans-serif"}}>Почта</span>
                            </div>
                            <div className="col-10 ps-4">
                                <input type="text" value="alexeev@gmail.com" onChange={(e) => e.target.value }  className="border border-1 pt-1 pb-1 ps-2 w-50" />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-2 d-flex justify-content-end">
                                <span className="fs-6 pt-2" style={{fontFamily: "Roboto, sans-serif"}}>Пол</span>
                            </div>
                            <div className="col-10 ps-4">
                                <input type="text" value="мужской" onChange={(e) => e.target.value }  className="border border-1 pt-1 pb-1 ps-2 w-50" />
                                <div className="mt-5">
                                    <button className="text-white border-0"
                                            style={{borderRadius: "4px", background: "#2283F5", padding: "8px 17px", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",}}>Изменить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
