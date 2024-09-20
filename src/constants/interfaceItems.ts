export interface CaretPos {
    x: number;
    y: number;
}

export interface ColorObject {
    name: string;
    color: {
        bg: string;
        primary: string;
        secondary: string;
        caret: string;
        text: string;
        textActive: string;
        error: string;
    };
}

export interface SuccessCallback<T> {
    (res?: any): void;
}
export interface ErrorCallback<T> {
    (res?: any): void;
}

export interface LoginData {
    login: string;
    password: string;
}

export interface RegisterData {
    email: string;
    username: string;
    password: string;
}

export interface EmailData {
    email: string;
}

export interface NewPassworData {
    newPassword: string;
}
