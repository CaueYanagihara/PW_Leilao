import React from "react";
import Logout from '../../components/logout/Logout.jsx';
import homeStyle from "./Home.module.css";
import { useTranslation }from "react-i18next";

const Home = () => {
    const {t} = useTranslation();

    return(
        <div className={`
        ${homeStyle['home-background']}
        w-full
        h-screen`}>

            <h1 className={`
            ${homeStyle.textColor}
            w-full`}>
                {t('welcome-to-home-page')}
            </h1>
            <Logout/>
        </div>
    );

}

export default Home;