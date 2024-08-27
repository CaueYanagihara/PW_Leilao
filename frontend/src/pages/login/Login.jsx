import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
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
        <div className="card w-9 mx-auto my-8">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Email</label>
                        <InputText onChange={handleChange} name="email" id="email" type="text" placeholder="Digite seu Email" className="w-12rem" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Senha</label>
                        <InputText onChange={handleChange} name="password" id="password" type="password" placeholder="Digite sua senha" className="w-12rem" />
                    </div>
                    <Button onClick={login} label={t('button.login')} icon="pi pi-user" className="w-10rem mx-auto"></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                </div>
            </div>
        </div>
    );

}

export default Login;