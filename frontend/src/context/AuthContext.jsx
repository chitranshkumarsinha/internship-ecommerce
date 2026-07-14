import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => { const [user, setUser] = useState(null); useEffect(() => { const userInfo = JSON.parse(localStorage.getItem('userInfo')); if (userInfo) { setUser(userInfo); axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`; } }, []);
const login = (data) => { setUser(data.user); localStorage.setItem('userInfo', JSON.stringify(data)); axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; };
const logout = () => { setUser(null); localStorage.removeItem('userInfo'); };
return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>; };
export const useAuth = () => React.useContext(AuthContext);