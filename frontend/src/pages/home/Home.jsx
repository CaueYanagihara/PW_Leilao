import React from "react";
import style from "./Home.module.css";
import Logout from '../../components/logout/Logout.jsx';
import { useTranslation }from "react-i18next";

const Home = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return(
        <div>
            <h1 className={`w-full ${style.textColor}`} >{t('welcome')} Pagina Inicial</h1>
            <button className={`${style['background-color']}`} onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('pt')}>Português</button>
            <Logout/>
        </div>
    );

}

export default Home;