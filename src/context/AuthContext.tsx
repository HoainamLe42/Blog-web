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
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    userId: '',
    login: () => {},
    logout: () => {},
});

export const defaultAvatar = 'default-avatar-url.jpeg';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        // Lấy data từ localStorage nếu có
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
        console.log('Log-in: ', user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        console.log('Log-out: ', user);
    };

    const userId = user?.id;

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    // if (user) {
    //     // console.log('User: ', user);
    //     console.log('Logged-in User ID:', typeof userId);
    // }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, userId }}>
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
