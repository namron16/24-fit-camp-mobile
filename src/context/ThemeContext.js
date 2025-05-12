import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {}
});
export const useThemeContext = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    return {theme, toggleTheme};
};