import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Login = () => {
    const [user, setUser] = useState({email:"", senha:""});
    const navigate = useNavigate();

    const handleChange = (input) =>{
        setUser({...user, [input.target.name]:input.target.value});
    }

    const login = () => {
        //DEVERA CHAMAR O BACKEND PARA VALIDAR OS DADOS DE LOGIN.
        if(user.email == "caueyanagihara@gmail.com" && user.password == "1234"){
            let token = "token to backend";
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            navigate("/");
        } else{
            alert("Usuário ou senha incorretos!");
        }        
    }

    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Email</label>
                        <InputText id="email" type="text" className="w-12rem" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Senha</label>
                        <InputText id="password" type="password" className="w-12rem" />
                    </div>
                    <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
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