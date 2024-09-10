import React from "react";
import { TabMenu } from 'primereact/tabmenu';
import headerStyle from "./Header.module.css";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t, i18n } = useTranslation();

    const items = [
        { label: t('home'), icon: 'pi pi-home', url: '/' },
        { label: t('contacts'), icon: 'pi pi-address-book', url: '/contats' }
    ];

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <div id="header" className={`
        ${headerStyle.header}
        grid
        fixed
        top-0
        z-5
        w-screen
        m-0`}>

            <div className={`
            ${headerStyle['grid-item']} 
            col-6
            p-0`}>
                <TabMenu model={items} />
            </div>

            <div className={`
            ${headerStyle['grid-item']} 
            flex
            justify-content-end
            col-6
            p-0`}>

                < button onClick={() => changeLanguage('en')} className={
                `${headerStyle['button']} 
                w-6rem 
                border-none`}>
                    Eng
                </button>

                < button onClick={() => changeLanguage('pt')} className={`
                ${headerStyle['button']} 
                w-6rem 
                border-none`}>
                    Port
                </button>
            </div>
        </div>
    )
}

export default Header;