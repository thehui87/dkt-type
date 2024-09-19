import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { colorArray } from '../constants/colorList';
import { setColorPickerSelection } from '../redux/toolbar/toolbar.slice';

// interface Props {
//     children?: React.ReactNode;
//     // any props that come into the component
// }

const themeInitialValue = {};

type ThemeContextType = {
    changeThemeColor: (colorName: string, hover?: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a MyProvider');
    }
    return context;
};

// : React.ReactNode
export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState('light');
    const { colorPickerSelection } = useSelector(
        (state: RootState) => state.toolbar
    );
    const dispatch = useDispatch();

    const changeThemeColor = useCallback(
        (colorName: string, hover: boolean = false) => {
            let colorItem = colorArray.filter((item) => item.name == colorName);

            if (colorItem.length > 0) {
                // setTheme(colorItem[0].name);

                if (!hover) dispatch(setColorPickerSelection(colorName));

                // set theme to local storage
                localStorage.setItem('theme', colorName);

                const root = document.documentElement;
                // Or
                // const root = document.querySelector(':root');

                // to access the primary color
                // const primaryColor =
                //     getComputedStyle(root).getPropertyValue('--primary-color');

                // to set new color
                root.style.setProperty('--bg-color', colorItem[0].color.bg);
                root.style.setProperty(
                    '--primary-color',
                    colorItem[0].color.primary
                );
                root.style.setProperty(
                    '--secondary-color',
                    colorItem[0].color.secondary
                );
                root.style.setProperty(
                    '--caret-color',
                    colorItem[0].color.caret
                );
                root.style.setProperty(
                    '--tertiary-color',
                    colorItem[0].color.text
                );
                root.style.setProperty('--text-color', colorItem[0].color.text);
                root.style.setProperty(
                    '--text-active-color',
                    colorItem[0].color.textActive
                );
                root.style.setProperty(
                    '--error-color',
                    colorItem[0].color.error
                );
            }
        },
        []
    );

    useEffect(() => {
        const savedTheme: any = localStorage?.getItem('theme');
        if (savedTheme) {
            changeThemeColor(savedTheme);
        }
    }, []);

    const values = useMemo(
        () => ({
            changeThemeColor,
        }),
        [changeThemeColor]
    );

    return (
        <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
    );
};
