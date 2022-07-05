import { useContext } from 'react';
import { AuthContext, UserContext, AuthContextType, UserContextType } from '../context/AuthContext';
import decode from 'jwt-decode';

export function CheckAuth() {
    const auth = useContext(AuthContext) as AuthContextType;
    const user = useContext(UserContext) as UserContextType;

    if(localStorage.getItem("loginToken") != null){
        auth.login();
        var token: any = localStorage.getItem("loginToken");
        var data: any = decode(token);
        user.setData(data);
    }
}