import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserAccount } from '../Services/userService';

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    const location = useLocation();

    const [user, setUser] = useState({
        isLoading: true,
        authenticated: false,
        token: '',
        account: {}
    });

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    }

    // render 1 lan token co user da duoc luu
    const fetchUser = async () => {
        let res = await getUserAccount();

        console.log("check res login : ", res)

        if (res && res.EC === 0) {
            let email = res.DT.email;
            let username = res.DT.username;
            let token = res.DT.access_Token;
            let groupWithRoles = res.DT.groupWithRoles;

            let data = {
                isLoading: false,
                isAuthenticated: true,
                token,
                account: { email, username, groupWithRoles }
            }

            console.log("check data", data)

            setUser(data)

        }
    }

    useEffect(() => {
        if (window.location.pathname !== '/') {
            fetchUser();
        }
    }, [])


    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export {
    UserProvider, UserContext
}