import React from "react";
import { useTranslation } from "react-i18next";
import footerStyle from "./Footer.module.css";

const Footer = () => {
    const { t } = useTranslation();
    const isLoggedIn = !!localStorage.getItem("token");

    if (!isLoggedIn) {
        return (
            <div id="footer" className={`
                ${footerStyle.footer}
                fixed
                bottom-0 
                left-0
                z-5
                w-screen
                m-0`}>
                <p className="mx-5">&copy; <span id="year"></span> MotoMart. {t('all-rights-reserved')}.</p>
            </div>
        );
    }

    return null;
}

export default Footer;