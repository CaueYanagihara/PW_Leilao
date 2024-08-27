import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';

const Logout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");
    }
    return(
    <>
        <Button label = "Sair" onClick = {logout}/>
    </>
    );
}

export default Logout;