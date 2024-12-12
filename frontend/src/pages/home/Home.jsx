import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import homeStyle from './Home.module.css';
import AuctionService from '../../service/AuctionService';
import { Toast } from 'primereact/toast';

const Home = () => {
    const { t } = useTranslation();
    const [myAuctions, setMyAuctions] = useState([]);
    const toast = useRef(null);

    const cardData = [
        { title: t('auction1-title'), description: t('auction1-description') },
        { title: t('auction2-title'), description: t('auction2-description') },
        { title: t('auction3-title'), description: t('auction3-description') }
    ];

    useEffect(() => {
        const auctionService = new AuctionService();
        const loadMyAuctions = async () => {
            try {
                const data = await auctionService.list();
                setMyAuctions(data);
            } catch (error) {
                console.error('Error fetching auctions', error);
            }
        };
        loadMyAuctions();
    }, []);

    return (
        <>
            <Toast ref={toast} className="z-5" />
            <div className={`
                flex
                align-items-center 
                justify-content-center
                w-full
                min-h-screen`}>
                <div className={`
                    ${homeStyle.background}
                    z-0
                    w-full
                    h-full
                    fixed
                    top-0
                    left-0`}>

                </div>
                <div className={`
                    ${homeStyle['home-background']}
                    z-1
                    flex
                    flex-column
                    align-items-center
                    justify-content-center
                    h-screen
                    `}>
                    <h1 className={`text-center m-0 text-50`}>{t('welcome')}</h1>
                    <p className={`text-center text-50`}>{t('home-description')}</p>
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
                    <div className={`
                        flex 
                        flex-wrap 
                        justify-content-center 
                        mt-5`}>
                        {myAuctions.map((auction, index) => (
                            <Card key={index} className={`
                                ${homeStyle.card}
                                m-3`}>
                                <h3>{auction.title}</h3>
                                <p>{auction.description}</p>
                                <Button 
                                    label={t('explore-now')}
                                    onClick={() => { /* Add navigation logic here */ }}
                                />
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;