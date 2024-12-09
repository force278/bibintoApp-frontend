import {useEffect} from "react";

export const AboutPage = () => {
    useEffect(() => {
        window.location.reload();
    }, []);
    return (
        <>
            <iframe src="/about/index.html" style={{width: '100%', height: '100%'}} title="About Page"/>
        </>

    );
};