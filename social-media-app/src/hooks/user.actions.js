import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import axios from "axios";

function useUserActions() {
    const navigate = useNavigate();
    const baseURL = 'http://localhost:8000/api';

    return {
        login,
        register,
        logout,
        edit,
    };

  // Login the user
    async function login(data) {
        return axios.post(`${baseURL}/auth/login/`, data).then((res) => {
            setUserData(res.data);  
            navigate("/");
        });
    }

  // Register the user
    async function register(data) {
        return axios.post(`${baseURL}/auth/register/`, data).then((res) => {
        // Registering the account and tokens in the store
            setUserData(res.data);
            navigate("/");
        });
    }

  // Edit the user
    async function edit(data, userId) {
        return axiosService
            .patch(`${baseURL}/user/${userId}/`, data, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
            // Registering the account in the store
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    access: getAccessToken(),
                    refresh: getRefreshToken(),
                    user: res.data,
                })
            );
        });
    }

  // Logout the user
    async function logout() {
        try{
            await axiosService.post(`${baseURL}/auth/logout/`, { refresh: getRefreshToken() });
            localStorage.removeItem("auth");
            navigate("/login");
        }catch(error){
            console.log(error);
        }
    }
}

// Get the user
function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth")) || null;
    if (auth) {
        return auth.user;
        } else {
    return null;
    }
}

// Get the access token
function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log(auth);
    return auth.access;
}

// Get the refresh token
function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.refresh;
}

// Set the access, token and user property
function setUserData(data) {
    localStorage.setItem(
            "auth",
        JSON.stringify({
            access: data.access,
            refresh: data.refresh,
            user: data.user,
        })
    );
}

export {
    useUserActions,
    getUser,
    getAccessToken,
    getRefreshToken,
    setUserData,
};