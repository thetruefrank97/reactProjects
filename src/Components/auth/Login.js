import React,{useState,useContext,useEffect} from "react";
import AuthContext from "../../Context/auth/AuthContext";
import AlertContext from "../../Context/alert/AlertContext";

const Login = (props) => {



    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const [user,setUser]=useState({
        email: "",
        password: "",
    })

    const{setAlert}=alertContext;
    const{loginUser,error,clearErrors,isAuthenticated} = authContext;
    const {email,password} = user;

    useEffect(() => {
        if(isAuthenticated){
            props.history.push("/")
        }

        if(error === "Invalid credentials"){
            setAlert(error,"danger");
            clearErrors();
        }

    },[props.history,isAuthenticated,error])




    const onChange = (event) => {
        setUser({...user,[event.target.name]: event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(email === "" || password === ""){
            setAlert("Please fill in all fields","danger");
        }else{
            loginUser({
                email,
                password
            });
        }
    };



    return(
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login;