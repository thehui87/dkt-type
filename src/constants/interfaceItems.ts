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
