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

const Header = () => {
    const [isActiveScroll, setIsActiveScroll] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user } = useAuth();

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
                    ? 'bg-yellowLight dark:bg-black dark:opacity-80 shadow-lg py-2 md:p-5'
                    : 'p-6'
            } transition-all duration-200`}
        >
            <Container>
                <div className="flex justify-between items-center text-black dark:text-white">
                    {/* Logo */}
                    <div className="font-bold flex items-center gap-2 text-black dark:text-white">
                        <Link to={config.routes.HOME.PATH}>
                            <img src={Logo} alt="" className="h-9 rounded-lg" />
                        </Link>
                        <span className="font-thin italic">TravelBlog</span>
                    </div>

                    {/* nav */}
                    <nav>
                        <ul className="hidden md:flex gap-8">
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
                    </nav>
                    {/* Login */}
                    <div className="flex items-center gap-5">
                        <ThemeToggle />
                        {user ? (
                            <div className="relative group">
                                <div className="relative h-10 w-10 rounded-full bg-sky-300 flex items-center justify-center text-5xl font-semibold">
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
                                <Button className="md:hidden bg-white bg-opacity-10 dark:hover:bg-black hover:bg-white hover:bg-opacity-40 dark:hover:bg-opacity-30">
                                    <Menu size="12" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
