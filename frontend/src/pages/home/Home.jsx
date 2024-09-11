import React from "react";
import Sidebar from '../../components/sidebar/Sidebar.jsx';
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
    
            <div className={`${homeStyle.dashboard}`}>
                
                <main className={`${homeStyle['dashboard-main']}`}>
                    <section className={`${homeStyle['dashboard-card']}`}>
                        <h2>Card Title 1</h2>
                        <p>Card content goes here.</p>
                    </section>
                <section className={`${homeStyle['dashboard-card']}`}>
                        <h2>Card Title 2</h2>
                        <p>Card content goes here.</p>
                    </section>
            <section className={`${homeStyle['dashboard-card']}`}>
                        <h2>Card Title 3</h2>
                        <p>Card content goes here.</p>
                    </section>
                </main>
            </div>
            <Logout/>
        </div>
    );

}

export default Home;