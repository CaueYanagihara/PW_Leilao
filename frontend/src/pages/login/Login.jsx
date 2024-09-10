import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from "primereact/card";
import loginStyle from "./Login.module.css";
import { useTranslation } from "react-i18next";

const Login = () => {
    const {t} = useTranslation();

    const [user, setUser] = useState({email:"", senha:""});
    const navigate = useNavigate();

    const handleChange = (input) =>{
        setUser({...user, [input.target.name]:input.target.value});
    }

    const login = () => {
        //DEVERA CHAMAR O BACKEND PARA VALIDAR OS DADOS DE LOGIN.
        if(user.email === "caueyanagihara@gmail.com" && user.password === "1234"){
            let token = "token to backend";
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            navigate("/");
        } else{
            alert("Usuário ou senha incorretos!");
        }        
    }

    return (
        <div className={`
        ${loginStyle['card-background']}
        flex
        align-items-center
        h-screen`}>

            <Card className={`
            ${loginStyle.card} 
            w-9 
            mx-auto 
            my-8`}>

                <div className="
                flex 
                flex-column 
                md:flex-row">

                    <div className="
                    flex 
                    flex-column 
                    align-items-center 
                    justify-content-center 
                    w-full 
                    md:w-5 
                    gap-3 
                    py-5">

                        <div className="
                        flex 
                        flex-wrap 
                        justify-content-center 
                        align-items-center 
                        gap-2">
                            <label className="w-6rem">{t('email')}</label>
                            <InputText onChange={handleChange} name="email" id="email" type="text" placeholder={t('enter-your-email')} className="w-12rem" />
                        </div>
                        <div className="
                        flex 
                        flex-wrap 
                        justify-content-center 
                        align-items-center 
                        gap-2">
                            <label className="w-6rem">{t('password')}</label>
                            <InputText onChange={handleChange} name="password" id="password" type="password" placeholder={t('enter-your-password')} className="w-12rem" />
                        </div>
                        <Button
                        label={t('button.login')}
                        icon="pi pi-user"
                        className="
                        w-10rem 
                        mx-auto"
                        onClick={login} />
                    </div>
                    <div className="
                    w-full 
                    md:w-2">

                        <Divider layout="vertical" className="
                        hidden 
                        md:flex">
                            <span className="font-bold">{t('or')}</span>
                        </Divider>

                        <Divider layout="horizontal" align="center" className="
                        flex 
                        md:hidden">
                            <span className="font-bold">{t('or')}</span>
                        </Divider>

                    </div>
                    <div className="
                    w-full 
                    md:w-5 
                    flex 
                    align-items-center 
                    justify-content-center 
                    py-5">

                        <Button label={t('button.sign-up')} icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={() => { navigate("/register"); }}></Button>
                    </div>
                </div>
            </Card>
        </div>
    );

}

export default Login;