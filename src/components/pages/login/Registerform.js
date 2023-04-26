import { baseUrl, register } from "../../constants/Api"; 
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
export let token = '';
const errorLogin = document.getElementById("tryAgain");


// ------ using formik and yup -------- //
const RegisterForm = () => {
  const navigate = useNavigate();
  
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password2: '',
            name: '',
            avatar: '',
            banner: ''
        },
        validationSchema: yup.object({
            email: yup.string().email().required("You have to fill in your email."),
            password: yup.string().min(8, 'Too short').required(),
            password2: yup.string().oneOf([yup.ref('password')]).required(),
            name: yup.string().required("Please fill in a name")
            
          }),
        onSubmit: values => {
            const userAuth = async () => {
                const settings = {
                    method: 'POST',
                    // getting values from the login input and storing them in body
                    body:JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }};
                try {
                    // api request
                  const response = await fetch(baseUrl + register, settings);
                  const data = await response.json();
                 console.log(data)
                    if(response.ok) {
                        // saved to localStorage
                        token = data.accessToken; 
                        localStorage.setItem('myToken', token); 
                        localStorage.setItem('name', data.name)

                        // going to feed page if response is ok
                        navigate("feed");
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
        <form onSubmit={formik.handleSubmit}>
          <small id="tryAgain">Something went wrong. Please check that all values are correct.</small>

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

            <label htmlFor="name" className="labelLogin">Name</label>
          <input 
            id="name"
            name="name"
            type="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
             <small className="error">{formik.errors.name}</small>
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

            <label htmlFor="password2" className="labelLogin">Repeat password</label>
            <input 
            id="password2"
            name="password2"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password2}
            />
            {formik.errors.password2 ? (
              <small className="error">{formik.errors.password2}</small>
            ) : null}

          <button 
           type="submit" 
           className="login labelLoginButton"
           id="loginButton"
           name="loginButton">
            Register and log in</button>        
        </form>
      );
}
export default RegisterForm;