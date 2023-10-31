import axios from "axios";
import { useNavigate } from "react-router-dom";

function useUserActions(){
    const navigate = useNavigate();
    const baseURL = "http://localhost:8000/api";

    return{
        login,
        register,
        logout,
    };

    // Login user
    function login(data){
        return axios.post(`${baseURL}/auth/login/`, data).then(
            (res) => {
                // register the account and tokens in the browser store
                setUserData(res.data);
                navigate("/");
            }
        );
    }

    // Register user
    function register(data){
        return axios.post(`${baseURL}/auth/register/`, data).then((res)=>{
            setUserData(res.data);
            navigate("/");
        });
    }

    // logout user
    function logout(){
        localStorage.removeItem("auth");
        navigate("/login");
    }

    // get user
    function getUser(){
        const auth = JSON.parse(localStorage.getItem("auth")) || null;
        if(auth){
            return auth.user ;      
        }else{
            return null;
        }
    }

    // get access token 
    function getAccessToken(){
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.access;
    }

    // get Refresh token 
    function getRefreshToken(){
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.refresh;
    }

    // set tokens and user property
    function setUserData(data){
        localStorage.setItem(
            "auth",
            JSON.stringify({
                access: data.access,
                refresh: data.refresh,
                user: data.user,
            })
        );
    }
}

export { useUserActions, getUser, getAccessToken, getRefreshToken};