import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import registerStyle from "./Register.module.css";
import { useTranslation } from "react-i18next";
import PersonService from "../../service/PersonService";

const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const personService = new PersonService();

    useEffect(() => {
        const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
        const isFormFilled =
            name &&
            email &&
            password &&
            confirmPassword &&
            isPasswordValid &&
            password === confirmPassword;
        setIsFormValid(isFormFilled);
    }, [
        name,
        email,
        password,
        confirmPassword,
        passwordCriteria,
    ]);

    const header = <div
        className="
        font-bold 
        mb-3">
            {t('enter-your-password')}
        </div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">{t('required')}:</p>
            <ul className="
            pl-2 
            ml-2 
            mt-0 
            line-height-3">
                <li className={passwordCriteria.hasLowerCase ? "text-green-500" : "text-red-500"}>
                    {t('register-page.required-lower-Case')}
                </li>
                <li className={passwordCriteria.hasUpperCase ? "text-green-500" : "text-red-500"}>
                    {t('register-page.required-upper-Case')}
                </li>
                <li className={passwordCriteria.hasNumber ? "text-green-500" : "text-red-500"}>
                    {t('register-page.required-number')}
                </li>
                <li className={passwordCriteria.hasSpecialChar ? "text-green-500" : "text-red-500"}>
                    {t('register-page.required-special-char')}
                </li>
                <li className={passwordCriteria.minLength ? "text-green-500" : "text-red-500"}>
                    {t('register-page.required-length')}
                </li>
            </ul>

        </>
    );

    const handleGoBack = () => {
        navigate(-1);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordCriteria({
            minLength: newPassword.length >= 6,
            hasUpperCase: /[A-Z]/.test(newPassword),
            hasLowerCase: /[a-z]/.test(newPassword),
            hasNumber: /[0-9]/.test(newPassword),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-\\]/.test(newPassword), // O '\\' é necessario para não ficar como palavra reservada.
        });
    };

    const handlePasswordConfirmation = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
        if (password !== confirmPassword) {
            setErrorMessage("As senhas devem ser iguais.");
        } else {
            setErrorMessage("");
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await personService.register({
                name,
                email,
                password
            });
            navigate("/login");
            alert("Usuário registrado!");
        } catch (err) {
            console.log(err);
            alert("Erro ao registrar usuário!");
        }
        setLoading(false);
    };

    const handleFieldFocus = (field) => {
        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [field]: false,
        }));
    };

    const handleFieldBlur = (field, value) => {
        if (!value) {
            setFieldErrors((prevErrors) => ({
                ...prevErrors,
                [field]: true,
            }));
        }
    };

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            
        }, 20000);
    };

    return (
        <div className={`
            ${registerStyle.register}
            flex
            min-h-screen
            align-items-center
            justify-content-center`}>
                
            <Card title={t('register')} className={`
                ${registerStyle['register-container']}
                flex
                align-items-center
                justify-content-center
                text-center`}>

                <p className={`
                    ${registerStyle['sub-title']} 
                    font-bold`}>
                    {t('register-page.provide-your-information')}:
                </p>

                <div className="
                    flex
                    flex-column
                    justify-content-center">

                    <div className={`
                        ${registerStyle['register-item']}`}>

                        <FloatLabel className="
                            w-full
                            mb-5">

                            <InputText
                                value={name}
                                id="name"
                                name="name"
                                autoComplete="name"
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => handleFieldFocus(t('name'))}
                                onBlur={() => handleFieldBlur(t('name'), name)}
                                required
                                className={`
                                    w-full ${fieldErrors.name ? "p-invalid" : ""}`} />

                            <label htmlFor="name">{t('name')}</label>

                        </FloatLabel>
                    </div>

                    <div className={`
                        ${registerStyle['register-item']}`}>

                        <FloatLabel className="
                            w-full
                            mb-5">

                            <InputText
                                value={email}
                                id="email"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => handleFieldFocus(t('email'))}
                                onBlur={() => handleFieldBlur(t('email'), email)}
                                keyfilter="email"
                                required
                                className={`
                                    w-full 
                                    ${fieldErrors.email ? "p-invalid" : ""}`} />

                            <label htmlFor="email">{t('email')}</label>

                        </FloatLabel>
                    </div>

                    <div className={`
                        ${registerStyle['register-item']} 
                        ${registerStyle['password-area']}`}>

                        <FloatLabel className="
                            w-full
                            mb-5">

                            <Password
                                value={password}
                                id="password"
                                name="password"
                                onChange={handlePasswordChange}
                                onFocus={() => {
                                    handleFieldFocus(t('password'));
                                    setIsPasswordFocused(true);
                                }}
                                onBlur={() => handleFieldBlur(t('password'), password)}
                                inputStyle={{ width: "100%" }}
                                toggleMask
                                header={header}
                                footer={footer}
                                invalid={
                                    isPasswordFocused &&
                                    !Object.values(passwordCriteria).every(Boolean)
                                }
                                promptLabel={t('register-page.waiting')}
                                weakLabel={t('register-page.too-simple')}
                                mediumLabel={t('register-page.medium-password')}
                                strongLabel={t('register-page.strong-password')}
                                className={`
                                    w-full
                                    ${fieldErrors.password ? "p-invalid" : ""}`} />

                            <label htmlFor="password">{t('password')}</label>

                        </FloatLabel>
                    </div>

                    <div className={`
                        ${registerStyle['register-item']}`}>

                        <FloatLabel className={`
                            ${registerStyle['password-area']}
                            w-full
                            mb-5`}>

                            <Password
                                value={confirmPassword}
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handlePasswordConfirmation}
                                onFocus={() => handleFieldFocus("Confirme a Senha")}
                                onBlur={() =>handleFieldBlur("Confirme a Senha", confirmPassword)}
                                inputStyle={{ width: "100%" }}
                                toggleMask
                                feedback={false}
                                required
                                className={`
                                    w-full
                                    ${fieldErrors.confirmPassword ? "p-invalid" : ""}`} />

                            <label htmlFor="confirmPassword">{t('confirm-your-password')}</label>

                        </FloatLabel>
                    </div>

                    <div id="confirmPasswordError">{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>

                    <div className={`
                        ${registerStyle['register-item']}`}>

                        <Button
                            label={t('create-account')}
                            id={`
                                ${registerStyle['register-button']}`}
                            className={`
                                w-18rem
                                mb-4
                                ${isFormValid ? `${registerStyle['valid-button']}` : `${registerStyle['invalid-button']}`}`}
                            disabled={!isFormValid}
                            loading={loading}
                            onClick={() => {handleSubmit();}}
                        />

                    </div>

                    <div className={`
                        ${registerStyle['register-item']}`}>

                        <Button
                            label={t('go-back')}
                            id={`${registerStyle['back-button']}`}
                            className="
                                w-full
                                mb-4"
                            link
                            onMouseOver={({ target }) => target.style.color = "var(--back-button-over-color)"}
                            onMouseOut={({ target }) => target.style.color = "var(--back-button-out-color)"}
                            onClick={handleGoBack}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Register;