import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from "primereact/card";
import loginStyle from "./Login.module.css";
import { useTranslation } from "react-i18next";
import PersonService from "../../service/PersonService";

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [user, setUser] = useState({email:"", senha:""});

    const personService = new PersonService();

    const login = async () => {
        //DEVERA CHAMAR O BACKEND PARA VALIDAR OS DADOS DE LOGIN.
        try{
            const response = await personService.login(user);
            let token = response.token;
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            navigate("/");
        } catch (err){
            console.log(err);
            alert("Usuário ou senha incorretos!");
        }        
    }

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
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
                            <label className="
                            w-6rem
                            text-center">
                                {t('email')}
                            </label>
                            <InputText onChange={handleChange} name="email" id="email" type="text" placeholder={t('enter-your-email')} className="w-12rem" />
                        </div>
                        <div className="
                        flex 
                        flex-wrap 
                        justify-content-center 
                        align-items-center 
                        gap-2">
                            <label className="
                            w-6rem
                            text-center">
                                {t('password')}
                            </label>
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
                        flex-column
                        align-items-center 
                        justify-content-center 
                        py-5 
                        gap-2">
                        <Button
                            label={t('button.sign-up')}
                            icon="pi pi-user-plus"
                            severity="success"
                            className="w-10rem my-2"
                            onClick={() => {navigate("/register");}}>
                        </Button>
                        <a
                            href="#"
                            onClick={() => {navigate('/password-reset');}}
                            className="
                                text-primary 
                                my-2">
                            {t('password-reset')}
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    );

}

export default Login;