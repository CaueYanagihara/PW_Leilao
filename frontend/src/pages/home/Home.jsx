import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import homeStyle from './Home.module.css';

const Home = () => {
    const { t } = useTranslation();

    const cardData = [
        { title: t('auction1-title'), description: t('auction1-description') },
        { title: t('auction2-title'), description: t('auction2-description') },
        { title: t('auction3-title'), description: t('auction3-description') }
    ];

    return (
        <div className={`
            ${homeStyle['home-background']}
            flex
            flex-column
            align-items-center
            justify-content-center
            h-screen
            `}>
            <h1 className={`text-center m-0`}>{t('welcome')}</h1>
            <p className={`text-center`}>{t('home-description')}</p>
            <div className={`flex flex-wrap justify-content-center`}>
                {cardData.map((card, index) => (
                    <Card key={index} className={`
                        ${homeStyle.card}
                        m-3`}>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <Button 
                            label={t('explore-now')}
                            onClick={() => { /* Add navigation logic here */ }}
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home;