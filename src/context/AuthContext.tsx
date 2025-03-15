import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { User } from '../types/AuthTypes';

type AuthProviderProps = {
    children: ReactNode;
};
type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    userId: string | undefined;
    userRole: string | undefined;
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    userId: '',
    userRole: '',
    login: () => {},
    logout: () => {},
});

export const defaultAvatar = 'default-avatar-url.jpeg';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        // Get data from localStorage if available
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Lỗi parsing user data từ localStorage');
            localStorage.removeItem('user');
            return null;
        }
    });

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', JSON.stringify(user.id));
        localStorage.setItem('userRole', JSON.stringify(user.role));
        console.log('Log-in: ', user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        console.log('Log-out: ', user);
    };

    const userId = user?.id;
    const userRole = user?.role;

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    if (user) {
        console.log('Logged-in User:', user);
    }

    return (
        <AuthContext.Provider
            value={{ user, setUser, login, logout, userId, userRole }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth phải được sử dụng trong AuthProvider');
    }
    return context;
};
