import React, { useRef } from "react";
import { TabMenu } from 'primereact/tabmenu';
import headerStyle from "./Header.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const Header = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const toast = useRef(null);

    const items = [
        { label: t('home'), icon: 'pi pi-home', url: '/' },
        { label: t('contacts'), icon: 'pi pi-address-book', url: '/contacts' }
    ];

    if (isLoggedIn) {
        items.push({ label: t('categories'), icon: 'pi pi-list', command: () => navigate('/category') });
        items.push({ label: t('my-auctions'), icon: 'pi pi-list', command: () => navigate('/my-auctions') });
    }

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    const handleLogout = () => {
        confirmDialog({
            message: t('confirm-logout'),
            header: t('confirmation'),
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: t('yes'),
            rejectLabel: t('no'),
            accept: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                navigate('/login');
                toast.current.show({ severity: 'info', summary: t('logged-out'), detail: t('logout-success') });
            }
        });
    }

    return (
        <>
            <Toast ref={toast} />
            <div id="header" className={`
            ${headerStyle.header}
            grid
            fixed
            top-0
            z-4
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
        </>
    )
}

export default Header;