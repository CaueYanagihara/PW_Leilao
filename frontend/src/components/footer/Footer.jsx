import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div id="footer" class="">
            <p>&copy; <span id="year"></span> MotoMart. {t('all-rights-reserved')}.</p>
        </div>
    );

}

export default Footer;