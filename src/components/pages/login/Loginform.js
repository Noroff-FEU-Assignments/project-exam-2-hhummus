import { baseUrl, authEndpoint } from "../../constants/Api"; 
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "../../css/Login.css";

// ------ using formik and yup -------- //
const LoginForm = () => {
  const errorLogin = document.getElementById("tryAgain");
  const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().email().required("You have to fill in your email."),
            password: yup.string().required("Wrong password. Please try again")
          }),
        onSubmit: values => {
            const userAuth = async () => {
                const settings = {
                    method: 'POST',
                    // getting values from the login input and storing them in body
                    body:JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    }};
                try {
                    // api request
                  const response = await fetch(baseUrl + authEndpoint, settings);
                  const data = await response.json();
                    if(response.ok) {
                      console.log(data)
                        // saved to localStorage
                        const token = data.accessToken; 
                        const name = data.name;

                        localStorage.setItem('myToken', token); 
                        localStorage.setItem('name', name)
                        
                        // going to feed page if response is ok
                        navigate("/feed");
                        
                         // refreshing page to resolve issue with Bearer null  when logging in
                         window.location.reload() 
                    } 
                    if(!response.ok) {
                        errorLogin.style.display = "block";
                    } 
                } catch (err) {
                  console.log('error', err);
                }
            }
            userAuth();
          },
    });

    return (
      <>
      <small id="tryAgain">Something went wrong. Email or password incorrect.</small>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="labelLogin">Email</label>
          <input pattern="^[\w\-.]+@(stud\.)?noroff\.no$" title="Only Noroff emails can register"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
             <small className="error">{formik.errors.email}</small>
            ) : null}
 
          <label htmlFor="password" className="labelLogin">Password</label>
          <input 
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
            {formik.errors.password ? (
              <small className="error">{formik.errors.password}</small>
            ) : null}

          <button 
           type="submit" 
           className="login labelLoginButton"
           id="loginButton"
           name="loginButton">
            Log in</button>      
        </form>
      </>
      );
}
export default LoginForm;

