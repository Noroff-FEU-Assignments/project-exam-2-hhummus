import { useState } from "react"; 
/* Login and register form */ 
import LoginForm from "./login/Loginform";
import RegisterForm from "./login/Registerform";
import FooterGlobal from "../constants/footer";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [buttonText, setButtonText] = useState("Don't have an account? Register here");

  const handleOnClick = () => {
    setIsLogin(!isLogin);
   (buttonText === "Don't have an account? Register here" ? setButtonText("Already have an account? Log in here") : setButtonText("Don't have an account? Register here"))
}

return (
    <>
    { isLogin ?   
        <div id="login">
        <div className="card card-body">
            <h2 className="titleLogin">Login</h2>
            <LoginForm />
        </div>
        </div> 
        : 
        <div id="register">
        <div className="card card-body">
            <h2 className="titleRegister">Register</h2>
           <RegisterForm />
        </div>
        </div>
    }

    <div className="container containerBtn">
    <button type="button" className="registerLoginBtn" onClick={handleOnClick}>{buttonText}</button>
    </div>

    <FooterGlobal /> 
</>
)}


