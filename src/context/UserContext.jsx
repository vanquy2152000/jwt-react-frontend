import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserAccount } from '../Services/userService';

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    }

    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    }

    const logoutContext = () => {
        setUser({ ...userDefault, isLoading: false })
    }

    // render 1 lan token co user da duoc luu
    const fetchUser = async () => {
        let res = await getUserAccount();

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
            setUser(data)
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])


    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export {
    UserProvider, UserContext
}