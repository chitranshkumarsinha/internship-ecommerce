import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import VendorDashboard from './pages/VendorDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

const PrivateRoute = ({ children, role }) => { const { user } = useAuth(); if (!user) return <Navigate to="/login" />; if (role && user.role !== role) return <Navigate to="/" />; return children; };

function App() { return (<AuthProvider><div style={{ padding: '20px', fontFamily: 'sans-serif' }}><h1 style={{ textAlign: 'center' }}>Multi-Vendor E-Commerce</h1><Routes><Route path="/login" element={<Login />} /><Route path="/" element={<Home />} /><Route path="/vendor" element={<PrivateRoute role="Vendor"><VendorDashboard /></PrivateRoute>} /><Route path="/customer" element={<PrivateRoute role="Customer"><CustomerDashboard /></PrivateRoute>} /></Routes></div></AuthProvider>); }
export default App;