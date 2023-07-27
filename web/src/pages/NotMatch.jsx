import React from 'react';
import inProgress from "../assets/img/notMatch/developing.png";
export function NotMatch() {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <div>
                        <h1 className="fw-bold fs-5">Идет разработка! Просто немного терпения...</h1>
                    </div>
                    <div>
                        <img src={inProgress} alt="Ведется разработка" style={{ width: '500px', height: '500px' }}/>
                    </div>
            </div>
        </>
    )
}
