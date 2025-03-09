import { NavLink, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { navData } from '../data/navData';
import ThemeToggle from '../components/ThemeToggle';
import Logo from '../assets/images/logo.webp';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import { defaultAvatar, useAuth } from '../context/AuthContext';
import DropdownAvatar from '../components/DropdownAvatar';
import Button from '../components/Button';
import { Menu } from 'lucide-react';
import MobileMenu from '../components/MobileMenu';

const Header = () => {
    const [isActiveScroll, setIsActiveScroll] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true);

    // const user = localStorage.getItem('user');

    const handleScroll = () => {
        setIsActiveScroll(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed w-full z-[100] ${
                isActiveScroll
                    ? 'bg-gray-400 dark:bg-black dark:opacity-80 shadow-lg py-2 md:p-5'
                    : 'py-6'
            } transition-all duration-[400ms]`}
        >
            <Container>
                <div className="flex justify-between items-center text-black dark:text-white">
                    {/* Logo */}
                    <Link to={config.routes.HOME.PATH}>
                        <div className="font-bold flex items-center gap-2 text-black dark:text-white cursor-pointer">
                            <img src={Logo} alt="" className="h-9 rounded-lg" />
                            <span className="font-thin italic">TravelBlog</span>
                        </div>
                    </Link>

                    {/* nav PC */}
                    <nav>
                        <ul className="hidden md:flex gap-8">
                            {navData.map((nav) => (
                                <li key={nav.id}>
                                    <NavLink
                                        to={nav.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'relative text-yellow-300 py-2 after:h-[2px] after:w-full after:bg-yellow-300 after:absolute after:left-0 after:bottom-0'
                                                : 'relative py-2 hover:text-yellow-300 transition-all duration-200 cursor-pointer hover-line'
                                        }
                                    >
                                        {nav.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Login */}
                    <div className="flex items-center gap-5">
                        <ThemeToggle />
                        {user ? (
                            <div className="relative group">
                                <div className="relative h-10 w-10 rounded-full bg-sky-300 hidden md:flex items-center justify-center text-5xl font-semibold">
                                    <img
                                        src={
                                            user?.avatar
                                                ? user.avatar
                                                : defaultAvatar
                                        }
                                        alt=""
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                </div>
                                <DropdownAvatar />
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() =>
                                        navigate(config.routes.AUTH.SIGN_IN)
                                    }
                                    className="hidden md:block px-6 py-2 text-black dark:text-white hover:backdrop-blur-md dark:hover:bg-black hover:bg-white hover:bg-opacity-40 dark:hover:bg-opacity-30 hover:shadow-md rounded-lg transition-all duration-200"
                                >
                                    Login
                                </button>
                            </>
                        )}

                        {/* Icon Menu */}
                        <Button className="md:hidden p-3 text-black dark:text-white bg-white bg-opacity-10 dark:hover:bg-black hover:bg-white hover:bg-opacity-40 dark:hover:bg-opacity-30">
                            <Menu
                                size="22"
                                onClick={() => setIsOpenMenu(!isOpenMenu)}
                            />
                            <MobileMenu
                                isOpen={isOpenMenu}
                                onClose={setIsOpenMenu}
                            />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
