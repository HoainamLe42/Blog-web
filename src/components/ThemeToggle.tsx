import themeIcon from '../assets/images/theme-icon.png';
import { useTheme } from '../context/ThemeProvider';

const ThemeToggle = () => {
    const { toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="h-7 w-12 rounded-3xl bg-gray-300 dark:bg-gray-500 flex items-center dark:justify-end transition-all duration-200 border-4 border-secondary-border"
        >
            <span className="h-6 w-6 rounded-full bg-white flex items-center justify-center dark:bg-gray-900">
                <img src={themeIcon} alt="Icons Theme" />
            </span>
        </button>
    );
};

export default ThemeToggle;
