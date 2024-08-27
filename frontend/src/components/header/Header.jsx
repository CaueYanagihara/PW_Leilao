import React from "react";
import "./Header.css";
import { TabMenu } from 'primereact/tabmenu';

const Header = () => {
    const items = [
        { label: 'Home', icon: 'pi pi-home', url: '/' },
        { label: 'Contatos', icon: 'pi pi-address-book', url: '/' }
    ];

    return (
        <div id="header" className="card">
            <TabMenu model={items} />
        </div>
    )
}

export default Header;