import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useTranslation } from 'react-i18next';
import PersonService from '../../service/PersonService';
import passwordResetStyle from './PasswordReset.module.css';
import loginStyle from "./Login.module.css";
import { Password } from 'primereact/password';

const PasswordReset = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCodeDialog, setShowCodeDialog] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [showPasswordResetDialog, setShowPasswordResetDialog] = useState(false);
    const personService = new PersonService();

    const handlePasswordResetRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await personService.passwordResetRequest(email);
            alert(t('password-reset-email'));
            setShowCodeDialog(true);
        } catch (error) {
            console.error('Erro ao solicitar recuperação de senha', error);
            alert("Falha no envio do código.");
        }
        setLoading(false);
    };

    const handleCodeValidation = async () => {
        setLoading(true);
        try {
            await personService.validatePasswordResetCode({ email, validationCode: code });
            alert(t('code-validated'));
            setShowPasswordResetDialog(true);
            setShowCodeDialog(false);
        } catch (error) {
            console.error('Erro ao validar código', error);
            alert("Código inválido ou expirado.");
        }
        setLoading(false);
    };

    const handleNewPasswordChange = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
        setPasswordCriteria({
            minLength: newPassword.length >= 6,
            hasUpperCase: /[A-Z]/.test(newPassword),
            hasLowerCase: /[a-z]/.test(newPassword),
            hasNumber: /[0-9]/.test(newPassword),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-\\]/.test(newPassword),
        });
    };

    const handleNewPasswordConfirmation = (e) => {
        const confirmPassword = e.target.value;
        setConfirmNewPassword(confirmPassword);
        if (newPassword !== confirmPassword) {
            setErrorMessage("As senhas devem ser iguais.");
        } else {
            setErrorMessage("");
        }
    };

    const handlePasswordReset = async () => {
        setLoading(true);
        try {
            await personService.resetPassword({ email, newPassword });
            alert(t('password-reset-success'));
            navigate('/login');
        } catch (error) {
            console.error('Erro ao redefinir senha', error);
            setErrorMessage(error.response?.data || 'Erro ao redefinir senha.');
        }
        setLoading(false);
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
                <h2 className={`text-center m-0`}>{t('password-reset')}</h2>
                <form 
                    className={`
                        flex
                        flex-column
                        justify-content-center`}
                    onSubmit={handlePasswordResetRequest}>
                    <div className={`my-3`}>
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
                        label={t('password-reset')}
                        loading={loading} />
                </form>
            </Card>

            <Dialog header={t('enter-validation-code')} visible={showCodeDialog} onHide={() => setShowCodeDialog(false)}>
                <div className={`my-3`}>
                    <label htmlFor="code">{t('validation-code')}</label>
                    <InputText
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                <Button 
                    className='w-12rem mx-auto'
                    type="button" 
                    label={t('validate-code')}
                    loading={loading}
                    onClick={handleCodeValidation} 
                />
            </Dialog>

            <Dialog header={t('reset-password')} visible={showPasswordResetDialog} onHide={() => setShowPasswordResetDialog(false)}>
                <div className={`my-3`}>
                    <label htmlFor="newPassword">{t('new-password')}</label>
                    <Password
                        id="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        toggleMask
                        feedback={false}
                        required
                        className={`w-full ${errorMessage ? "p-invalid" : ""}`}
                    />
                </div>
                <div className={`my-3`}>
                    <label htmlFor="confirmNewPassword">{t('confirm-new-password')}</label>
                    <Password
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={handleNewPasswordConfirmation}
                        toggleMask
                        feedback={false}
                        required
                        className={`w-full ${errorMessage ? "p-invalid" : ""}`}
                    />
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button 
                    className='w-12rem mx-auto'
                    type="button" 
                    label={t('reset-password')}
                    loading={loading}
                    onClick={handlePasswordReset} 
                />
            </Dialog>
        </div>
    );
};

export default PasswordReset;