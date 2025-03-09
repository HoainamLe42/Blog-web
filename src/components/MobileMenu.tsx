import { NavLink, useLocation } from 'react-router-dom';
import { navData } from '../data/navData';
import { Link } from 'react-router-dom';
import config from '../config';
import Logo from '../assets/images/logo.webp';
import { useEffect, useState } from 'react';
import Button from './Button';
import { defaultAvatar, useAuth } from '../context/AuthContext';
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { menuUserData } from '../data/menuUserData';

type MobileMenuProps = {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isMenuUser, setIsMenuUser] = useState<boolean>(false);

    // Đóng menu khi route thay đổi
    useEffect(() => {
        onClose(false);
    }, [location]);

    console.log('Check data: ', user);

    return (
        <div
            className={`fixed z-50 top-0 left-0 bottom-0 ${
                isOpen ? 'w-[72vw]' : 'w-0'
            } transition-all duration-300 bg-white`}
        >
            {isOpen && (
                <div
                    onClick={() => onClose(false)}
                    className="fixed z-10 inset-0 bg-black/50"
                ></div>
            )}

            {isOpen && (
                <nav className="relative z-[999] p-4 h-full bg-white shadow-lg">
                    {/* Logo */}
                    <div className="font-bold flex items-center justify-center gap-2 text-black dark:text-white">
                        <Link to={config.routes.HOME.PATH}>
                            <img src={Logo} alt="" className="h-9 rounded-lg" />
                        </Link>
                        <span className="font-thin italic">TravelBlog</span>
                    </div>

                    {/* Menu */}
                    <ul className="flex flex-col md:hidden gap-5 mt-5 text-black">
                        {navData.map((nav) => (
                            <li key={nav.id}>
                                <NavLink
                                    to={nav.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'relative text-yellow-300 py-2 after:h-[2px] after:w-full after:bg-yellow-300 after:absolute after:left-0 after:bottom-0'
                                            : 'relative py-2 hover:text-yellow-300 dark:hover:text-primary transition-all duration-200 cursor-pointer hover-line'
                                    }
                                >
                                    {nav.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Sign-in & Sign-up */}
                    <hr className="my-7" />
                    {user ? (
                        <div className="flex flex-col items-center">
                            <p className="text-black font-bold">Tài khoản</p>
                            <div className="flex items-center justify-center gap-4 mt-5 mb-2">
                                <div className="h-10 w-10 rounded-full bg-sky-300 items-center justify-center text-5xl font-semibold">
                                    <img
                                        src={
                                            user?.avatar
                                                ? user.avatar
                                                : defaultAvatar
                                        }
                                        alt="Avatar"
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                </div>
                                <p className="text-secondary-text">
                                    {user.username}
                                </p>
                            </div>

                            {/* Menu user */}
                            <div>
                                <ul
                                    className={`flex flex-col gap-4 ${
                                        isMenuUser
                                            ? 'max-h[-[200px]] opacity-100'
                                            : 'max-h-[0] opacity-0 hidden'
                                    }transition-all duration-500 overflow-hidden text-nowrap text-black text-base`}
                                >
                                    {menuUserData.map((link) => (
                                        <li key={link.id}>
                                            <Link
                                                to={link.path}
                                                className="flex items-center gap-4 cursor-pointer"
                                            >
                                                <link.icon className="w-[18px]" />
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <span
                                    onClick={() => setIsMenuUser(!isMenuUser)}
                                    className={`inline-block text-center animate-bounce ${
                                        isMenuUser ? 'mt-4' : 'mt-0'
                                    }`}
                                >
                                    {isMenuUser ? (
                                        <ChevronUp color="black" />
                                    ) : (
                                        <ChevronDown color="black" />
                                    )}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-around">
                            <Button
                                to={config.routes.AUTH.SIGN_IN}
                                className="flex items-center justify-center h-10"
                            >
                                Sign In
                            </Button>
                            <Button
                                to={config.routes.AUTH.SIGN_UP}
                                variant="outline"
                                className="flex items-center justify-center h-10 text-black underline"
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}

                    {user && (
                        <div
                            onClick={logout}
                            className="absolute bottom-0 left-0 flex gap-4 items-center px-4 py-3 mb-5 text-black  cursor-pointer"
                        >
                            <LogOut />
                            Đăng xuất
                        </div>
                    )}
                </nav>
            )}
        </div>
    );
};

export default MobileMenu;
