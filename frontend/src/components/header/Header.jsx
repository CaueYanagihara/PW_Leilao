import React from "react";
import { TabMenu } from 'primereact/tabmenu';
import headerStyle from "./Header.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const items = [
        { label: t('home'), icon: 'pi pi-home', url: '/' },
        { label: t('contacts'), icon: 'pi pi-address-book', url: '/contacts' }
    ];

    if (isLoggedIn) {
        items.push({ label: t('categories'), icon: 'pi pi-list', command: () => navigate('/category') });
    }

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate('/login');
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

                <button onClick={() => changeLanguage('en')} className={`
                ${headerStyle['button']} 
                w-8rem 
                border-none`}>
                    Eng
                </button>

                <button onClick={() => changeLanguage('pt')} className={`
                ${headerStyle['button']} 
                w-8rem 
                border-none`}>
                    Port
                </button>

                {isLoggedIn && (
                    <button onClick={handleLogout} className={`
                    ${headerStyle['button']} 
                    w-10rem 
                    border-none`}>
                        {t('logout')}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header;