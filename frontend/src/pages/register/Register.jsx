import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import registerStyle from "./Register.module.css";

const Register = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

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

    const header = <div className="font-bold mb-3">Informe a Senha</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Obrigatório:</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li
                    className={
                        passwordCriteria.hasLowerCase ? "text-green-500" : "text-red-500"
                    }
                >
                    Ao menos uma letra minúscula
                </li>
                <li
                    className={
                        passwordCriteria.hasUpperCase ? "text-green-500" : "text-red-500"
                    }
                >
                    Ao menos uma letra maiúscula
                </li>
                <li
                    className={
                        passwordCriteria.hasNumber ? "text-green-500" : "text-red-500"
                    }
                >
                    Ao menos um número
                </li>
                <li
                    className={
                        passwordCriteria.hasSpecialChar ? "text-green-500" : "text-red-500"
                    }
                >
                    Ao menos um caractere especial
                </li>
                <li
                    className={
                        passwordCriteria.minLength ? "text-green-500" : "text-red-500"
                    }
                >
                    Mínimo de 6 caracteres
                </li>
            </ul>

        </>
    );

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

    return (
        <div className={`
            register
            flex
            min-h-screen
            align-items-center
            justify-content-center
            ${registerStyle.register}`}>
            <Card title="Registro" className={`
                register-container
                flex
                align-items-center
                justify-content-center
                text-center
                ${registerStyle['register-container']}`}>
                <p className="sub-title font-bold">Informe seus dados:</p>
                <div className="
                    flex
                    flex-column
                    justify-content-center">
                    <div className="register-item">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <InputText
                                value={name}
                                id="name"
                                name="name"
                                autoComplete="name"
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => handleFieldFocus("Nome")}
                                onBlur={() => handleFieldBlur("Nome", name)}
                                required
                                className={`
                                    w-full ${fieldErrors.name ? "p-invalid" : ""}`} />
                            <label htmlFor="name">Nome</label>
                        </FloatLabel>
                    </div>
                    <div className="register-item">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <InputText
                                value={email}
                                id="email"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => handleFieldFocus("Email")}
                                onBlur={() => handleFieldBlur("Email", email)}
                                keyfilter="email"
                                required
                                className={`
                                    w-full ${fieldErrors.email ? "p-invalid" : ""}`} />
                            <label htmlFor="email">Email</label>
                        </FloatLabel>
                    </div>
                    <div className="
                        password-area
                        register-item">
                        <FloatLabel className="
                            w-full
                            mb-5">
                            <Password
                                value={password}
                                id="password"
                                name="password"
                                onChange={handlePasswordChange}
                                onFocus={() => {
                                    handleFieldFocus("Senha");
                                    setIsPasswordFocused(true);
                                }}
                                onBlur={() => handleFieldBlur("Senha", password)}
                                inputStyle={{ width: "100%" }}
                                toggleMask
                                header={header}
                                footer={footer}
                                invalid={
                                    isPasswordFocused &&
                                    !Object.values(passwordCriteria).every(Boolean)
                                }
                                className={`
                                    w-full
                                    ${fieldErrors.password ? "p-invalid" : ""}`} />
                            <label htmlFor="password">Senha</label>
                        </FloatLabel>
                    </div>
                    <div className="register-item">
                        <FloatLabel className="
                            password-area
                            w-full
                            mb-5">
                            <Password
                                value={confirmPassword}
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handlePasswordConfirmation}
                                onFocus={() => handleFieldFocus("Confirme a Senha")}
                                onBlur={() =>
                                    handleFieldBlur("Confirme a Senha", confirmPassword)
                                }
                                inputStyle={{ width: "100%" }}
                                toggleMask
                                feedback={false}
                                required
                                className={`
                                    w-full
                                    ${fieldErrors.confirmPassword ? "p-invalid" : ""}`} />
                            <label htmlFor="confirmPassword">Confirme a Senha</label>
                        </FloatLabel>
                    </div>
                    <div id="confirmPasswordError">
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                    <div className="register-item">
                        <Button
                            label="Criar Conta"
                            id="register-button"
                            className={`
                                w-18rem
                                mb-4
                                ${isFormValid ? "bg-green-600 border-green-600" : "bg-gray-500 border-gray-500"}
                            `}
                            disabled={!isFormValid}
                        />
                    </div>
                    <div className="register-item">
                        <Button
                            label="Voltar"
                            id="back-button"
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