import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login/Login'
import Home from './../components/Home';
import User from './../components/User';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<User />} />
                {/* <Route path="/users"
                    element={
                        <PrivateRoute>
                            <TableUser />
                        </PrivateRoute>
                    } /> */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </>
    )
}

export default AppRoutes