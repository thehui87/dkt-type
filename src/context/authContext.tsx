// src/context/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
    useMemo,
    useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { logoutUser, loginUsers } from '../redux/auth/auth.api';
import { persistor } from '../redux/store';
// import { SuccessCallback, ErrorCallback } from '../constants/interfaceItems';

interface LoginData {
    login: string;
    password: string;
}

export interface SuccessCallback<T> {
    (res?: any): void;
}
export interface ErrorCallback<T> {
    (res?: any): void;
}

interface AuthContextType {
    isAuthenticated: boolean;
    logout: (
        onSuccessCallback: (res?: any) => void,
        onErrorCallback: (res?: any) => void
    ) => void;
    login: (
        {}: LoginData,
        onSuccessCallback: (res?: any) => void,
        onErrorCallback: (res?: any) => void
    ) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// React.FC<{ children: React.ReactNode }>
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { userLoggedIn } = useSelector((state: RootState) => state.auth);
    const [isAuthenticated, setIsAuthenticated] = useState(userLoggedIn);

    const login = useCallback(
        (
            data: LoginData,
            onSuccessCallback: SuccessCallback<any>,
            onErrorCallback: ErrorCallback<any>
        ) => {
            dispatch(loginUsers(data))
                .unwrap()
                .then((response: any) => {
                    // console.log('logged in...');
                    setIsAuthenticated(userLoggedIn);
                    onSuccessCallback(response);
                })
                .catch((error) => {
                    // setError(error?.response?.data);
                    onErrorCallback(error);
                });

            // setIsAuthenticated(userLoggedIn)
        },
        []
    );
    const logout = useCallback(
        (
            onSuccessCallback: SuccessCallback<any>,
            onErrorCallback: ErrorCallback<any>
        ) => {
            dispatch(logoutUser())
                .unwrap()
                .then((response: any) => {
                    persistor.purge();
                    setIsAuthenticated(userLoggedIn);
                    onSuccessCallback(response);
                })
                .catch((error: any) => {
                    // setError(error?.response?.data);
                    console.error(error);
                    onErrorCallback('');
                });
        },
        []
    );

    useEffect(() => {
        if (userLoggedIn) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [userLoggedIn]);

    const values = useMemo(
        () => ({
            login,
            logout,
            isAuthenticated,
        }),
        [login, logout, isAuthenticated]
    );

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
