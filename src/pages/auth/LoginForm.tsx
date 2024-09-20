import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../../redux/auth/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
// import { useAuth } from '../../context/authContext';
// import { login,  } from '../../context/authContext';
import { useAuth } from '../../context/authContext';
import ButtonSpinner from '../../components/buttonSpinner';

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

interface LoginData {
    login: string;
    password: string;
}
// { onSubmit }
const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [hover, setHover] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { login, logout } = useAuth();

    const { loading, userLoggedIn } = useSelector(
        (state: RootState) => state.auth
    );

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const onSuccessCallback = (res: any) => {
            navigate('/dashboard');
        };

        const onErrorCallback = (res: any) => {
            setError(res);
        };

        // Simple validation
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        const data: LoginData = {
            login: email,
            password,
        };
        login(data, onSuccessCallback, onErrorCallback);
        // .unwrap()
        // .then((response: any) => {
        //     // console.log('logged in...');
        //     navigate('/dashboard');
        // })
        // .catch((error: any) => {
        //     setError(error?.response?.data);
        // });

        // Clear error and submit the form
        setError('');
        // onSubmit(email, password);
    };

    useEffect(() => {
        if (userLoggedIn) {
            navigate('/dashboard');
        }
    }, [userLoggedIn]);

    return (
        <div
            className=" flex items-center justify-center bg-color"
            style={{ height: 'calc(100vh - 168px)' }}
        >
            <div className="primary-color p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-active-color">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-active-color mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-active-color mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="text-right mt-0 text-active-color">
                            <button
                                onClick={() => navigate('/forgot-password')}
                                className="text-active-color underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <ButtonSpinner type="submit" showSpinner={loading}>
                        Login
                    </ButtonSpinner>

                    <div className="text-center mt-4 text-active-color">
                        Don't have an account?
                        <button
                            onClick={() => navigate('/register')}
                            className="text-active-color underline ml-2"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <button
                className="text-active-color underline ml-2"
                onClick={() => dispatch(refreshAccessToken())}
            >
                Refresh Token
            </button>
        </div>
    );
};

export default LoginForm;
