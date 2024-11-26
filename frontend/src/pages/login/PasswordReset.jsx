import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useTranslation } from 'react-i18next';
import PersonService from '../../service/PersonService';
import passwordResetStyle from './PasswordReset.module.css';
import loginStyle from "./Login.module.css";

const PasswordReset = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handlePasswordResetRequest = async (e) => {
        e.preventDefault();
        try {
            await PersonService.passwordResetRequest({ email });
            alert(t('password-reset-email'));
            navigate('/login');
        } catch (error) {
            console.error('Erro ao solicitar recuperação de senha', error);
        }
    };

    return (
        <div className={`
            ${loginStyle['card-background']}
            flex
            justify-content-center 
            align-items-center
            h-screen
            `}>
            <Card className={`
                ${passwordResetStyle.card}
                p-5`}>
                <h2 className={`text-center`}>{t('password-reset')}</h2>
                <form 
                    className={`
                        flex
                        flex-column
                        justify-content-center`}
                    onSubmit={handlePasswordResetRequest}>
                    <div className={`mb-3`}>
                        <label htmlFor="email">{t('email')}</label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button 
                        className='
                            w-12rem
                            mx-auto'
                        type="submit" 
                        label={t('password-reset')}/>
                </form>
            </Card>
        </div>
    );
};

export default PasswordReset;