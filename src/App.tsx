import React from 'react';
// import { ReactComponent as Logo } from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import Home from './pages/home';
import About from './pages/about';
import Profile from './pages/profile';
import MyFooter from './components/footer';
import Test from './pages/test';
import SpeedTyping from './pages/SpeedTyping';
import SpeedTypingDouble from './pages/Doubly';
import Dashboard from './pages/dashboard';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';
import {
    LoginForm,
    RegisterForm,
    ForgotPasswordForm,
    ResetForm,
} from './pages/auth';
// import { useState } from 'react';
// import { useSelector, UseSelector } from 'react-redux';
// import { RootState, AppDispatch } from './redux/store';

function App() {
    // const { userLoggedIn } = useSelector((state: RootState) => state.auth);

    // if()

    // const [authPage, setAuthPage] = useState<'login' | 'register' | 'reset'>(
    //     'login'
    // );
    // let location = useLocation();
    // console.log(location);

    // window.location.href

    // const handleAuth = (email: string, password?: string) => {
    //     console.log(`Email: ${email}, Password: ${password}`);
    // };

    return (
        <div className="App">
            {/* <header className="App-header">
                <Logo className="App-logo w-48 h-48" />
            </header> */}

            <div className="bg-color h-dvh">
                <AuthProvider>
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/test" element={<Test />} />
                            <Route path="/type" element={<SpeedTyping />} />
                            <Route
                                path="/type2"
                                element={<SpeedTypingDouble />}
                            />
                            <Route path="/login" element={<LoginForm />} />
                            <Route
                                path="/register"
                                element={<RegisterForm />}
                            />

                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPasswordForm />}
                            />
                            <Route
                                path="/reset-password"
                                element={<ResetForm />}
                            />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </div>
            <MyFooter />
            {/* */}
        </div>
    );
}

export default App;
