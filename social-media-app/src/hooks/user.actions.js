import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function useUserActions(){
    const navigate = useNavigate();
    const baseURL = "http://localhost:8000/api";

    function login(data){
        return axios.post(`${baseURL}/auth/login`,data).then((res) => {
            // Registering the account and tokens in the store
            setUserData(data);
            navigate("/");
        });
    }
    
    function logout(){
        localStorage.removeItem("auth");
        navigate("/login");
    }
    
    function getAccessToken(){
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.access;
    }
    
    function getRefreshToken(){
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.refresh;
    }
    
    function setUserData(data){ 
        localStorage.setItem(
            "auth",
            JSON.stringify({
                access: res.data.access,
                refresh: res.data.refresh,
                user: res.data.user,
            })
        );
    }

    return(
        login,
        register,
        logout,
        );
}

export default useUserActions;