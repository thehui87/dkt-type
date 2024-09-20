// src/context/AuthContext.tsx
import React, {
    createContext,
    useContext,
    // useState,
    ReactNode,
    useCallback,
    useMemo,
    // useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import {
    logoutUser,
    loginUser,
    registerUser,
    forgotPaswordURL,
    resetPasswordURL,
} from '../redux/auth/auth.api';
import { persistor } from '../redux/store';
// import { SuccessCallback, ErrorCallback } from '../constants/interfaceItems';
import {
    LoginData,
    RegisterData,
    SuccessCallback,
    ErrorCallback,
    EmailData,
    NewPassworData,
} from '../constants/interfaceItems';

interface AuthContextType {
    // isAuthenticated: boolean;
    logout: (
        onSuccessCallback: SuccessCallback<any>,
        onErrorCallback: ErrorCallback<any>
    ) => void;
    login: (
        data: LoginData,
        onSuccessCallback: SuccessCallback<any>,
        onErrorCallback: ErrorCallback<any>
    ) => void;
    register: (
        data: RegisterData,
        onSuccessCallback: SuccessCallback<any>,
        onErrorCallback: ErrorCallback<any>
    ) => void;
    forgotPassword: (
        data: EmailData,
        onSuccessCallback: SuccessCallback<any>,
        onErrorCallback: ErrorCallback<any>
    ) => void;
    resetPassword: (
        data: NewPassworData,
        token: string,
        onSuccessCallback: SuccessCallback<any>,
        onErrorCallback: ErrorCallback<any>
    ) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// React.FC<{ children: React.ReactNode }>
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    // const { userLoggedIn } = useSelector((state: RootState) => state.auth);
    // const [isAuthenticated, setIsAuthenticated] = useState(userLoggedIn);

    const login = useCallback(
        (
            data: LoginData,
            onSuccessCallback: SuccessCallback<any>,
            onErrorCallback: ErrorCallback<any>
        ) => {
            dispatch(loginUser(data))
                .unwrap()
                .then((response: any) => {
                    onSuccessCallback(response);
                })
                .catch((error) => {
                    onErrorCallback(error);
                });
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
                    onSuccessCallback(response);
                })
                .catch((error: any) => {
                    console.error(error);
                    onErrorCallback('');
                });
        },
        []
    );

    const register = useCallback(
        (
            data: RegisterData,
            onSuccessCallback: SuccessCallback<any>,
            onErrorCallback: ErrorCallback<any>
        ) => {
            dispatch(registerUser(data))
                .unwrap()
                .then((response: any) => {
                    onSuccessCallback(response);
                })
                .catch((error) => {
                    onErrorCallback(error);
                });
        },
        []
    );

    const forgotPassword = useCallback(
        (
            data: EmailData,
            onSuccessCallback: SuccessCallback<any>,
            onErrorCallback: ErrorCallback<any>
        ) => {
            dispatch(forgotPaswordURL(data))
                .unwrap()
                .then((response: any) => {
                    onSuccessCallback(response);
                })
                .catch((error) => {
                    onErrorCallback(error);
                });
        },
        []
    );

    const resetPassword = useCallback(
        (
            data: NewPassworData,
            token: string,
            onSuccessCallback: SuccessCallback<any>,
            onErrorCallback: ErrorCallback<any>
        ) => {
            dispatch(resetPasswordURL({ dataObj: data, token: token }))
                .unwrap()
                .then((response: any) => {
                    onSuccessCallback(response);
                })
                .catch((error) => {
                    onErrorCallback(error);
                });
        },
        []
    );

    const values = useMemo(
        () => ({
            login,
            logout,
            register,
            forgotPassword,
            resetPassword,
        }),
        [login, logout, register, forgotPassword, resetPassword]
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
