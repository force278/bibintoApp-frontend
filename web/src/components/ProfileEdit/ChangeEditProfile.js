import React, { useRef, useState } from 'react'
import { CropperModal } from "./CropperModal";
import defaultAvatar from "../../assets/img/editProfile/defaultAvatar.png";

export default function ChangeEditProfile() {
    const [src, setSrc] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    const handleInputClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };

    const handleImgChange = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
        setModalOpen(true);
    };
    return (
        <>
            <div className="col-8">
                <div className="row">
                    <div className="d-flex mb-3" style={{marginTop: "33px"}}>
                        <div className="col-2 d-flex justify-content-end">
                            <div className="img-container">
                                <img
                                    style={{cursor: "pointer", borderRadius: '50%' }}
                                    onClick={handleInputClick}
                                    src={
                                        preview ||
                                        defaultAvatar
                                    }
                                    alt=""
                                    width="38px"
                                    height="38px"
                                />
                                <CropperModal
                                    modalOpen={modalOpen}
                                    src={src}
                                    setPreview={setPreview}
                                    setModalOpen={setModalOpen}
                                />
                                <input
                                    style={{display: 'none'}}
                                    type="file"
                                    accept="image/*"
                                    ref={inputRef}
                                    onChange={handleImgChange}
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column col-10 ps-4">
                            <span className="fs-5">alexeev</span>
                            <button onClick={handleInputClick} className="text-primary bg-transparent border-0 d-flex justify-content-start ps-0">Загрузите новое фото</button>
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
        </>

    )
}
