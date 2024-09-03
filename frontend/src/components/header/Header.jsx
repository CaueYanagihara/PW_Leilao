import React from "react";
import "./Header.css";
import { TabMenu } from 'primereact/tabmenu';
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();
    
    const items = [
        { label: t('home'), icon: 'pi pi-home', url: '/' },
        { label: t('contacts'), icon: 'pi pi-address-book', url: '/contacts' }
    ];

    return (
        <div id="header" className="card">
            <TabMenu model={items} />
        </div>
    )
}

export default Header;