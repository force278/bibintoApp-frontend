import React from 'react'
import "../sass/common.scss";


export const Messanger = ({children})  => {
    return (
        <div className="border-1 border bg-white w-100 container" style={{height: "647px", marginTop: '32px', borderRadius: '6px'}}>
            <div className="row h-100">
                <div className="col-4 border-1 border-end">
                    {/*Контакты*/}

                    <div className="pt-3 pb-3 position-relative ps-5">
                        <span className="fs-6 fw-medium" style={{fontFamily: "Roboto, sans-serif"}}>
                            <h1>One</h1>
                        </span>
                    </div>

                    <div className="pt-3 pb-3 position-relative ps-5">
                        <span className="fs-6 fw-medium" style={{fontFamily: "Roboto, sans-serif"}}>
                            <h1>Two</h1>
                        </span>
                    </div>

                </div>
                {/*Сообщения*/}
                {children}
            </div>
        </div>
    )
}
