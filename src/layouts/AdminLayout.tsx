import { Menu } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { sidebarAdminData } from '../data/sidebarAdminData';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

import Logo from '../assets/images/logo.webp';
import { Link } from 'react-router-dom';
import config from '../config';

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        setIsOpenSidebar(false);
    }, [location]);

    return (
        <div className="h-screen">
            <Helmet>
                <title>Admin | Website Blog</title>
                <meta
                    name="description"
                    content="Trang admin của website Blog"
                />
            </Helmet>
            <div className="flex">
                {/* SideBar pC  */}
                <aside
                    className={`sticky top-0 left-0 bottom-0${
                        isOpenSidebar
                            ? 'w-[20%] min-w-[280px] '
                            : 'w-[5%] min-w-[72px]'
                    } border border-r-gray-200 shadow-lg bg-gray-100 h-screen transition-all duration-200 hidden sm:block`}
                >
                    <div className="flex items-center gap-8 ml-4 mt-2">
                        <div
                            onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                            className="p-2 bg-white relative top-0 left-0 inline-block cursor-pointer rounded shadow-md"
                        >
                            <Menu size="25" />
                        </div>
                        {isOpenSidebar && (
                            <div className="flex items-center gap-2">
                                <img
                                    src={Logo}
                                    alt=""
                                    className="h-7 rounded-lg"
                                />
                                <span className="font-thin italic">
                                    TravelBlog
                                </span>
                            </div>
                        )}
                    </div>

                    <hr className="mx-2 my-2" />
                    <nav>
                        <ul className="flex flex-col gap-4 ml-2 mt-8">
                            {sidebarAdminData.map((link) => (
                                <li key={link.id}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center gap-5 flex-nowrap bg-red-200 py-2 px-2 rounded-md mr-2 font-bold'
                                                : 'flex items-center gap-5 px-2 mr-2'
                                        }
                                    >
                                        <span className="p-2 flex-shrink-0 bg-white rounded">
                                            <link.icon />
                                        </span>
                                        <span
                                            className={`${
                                                isOpenSidebar
                                                    ? 'opacity-100'
                                                    : 'opacity-0 hidden'
                                            } transition-all duration-200 text-nowrap`}
                                        >
                                            {link.name}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Mobile */}
                <aside className="relative flex sm:hidden">
                    <div
                        className={`h-screen absolute z-[999] top-0 left-0 ${
                            isOpenSidebar ? 'w-[270px]' : 'w-0'
                        } transition-all duration-400 bg-gray-200`}
                    >
                        {isOpenSidebar && (
                            <nav>
                                <ul className="flex flex-col gap-4 ml-2 mt-2 bg-gray-200">
                                    <li
                                        onClick={() =>
                                            setIsOpenSidebar(!isOpenSidebar)
                                        }
                                        // className="relative h-10 w-10 ml-2 p-2 bg-white cursor-pointer rounded"
                                        className="flex items-center gap-10"
                                    >
                                        <div className="flex flex-shrink-0 items-center justify-center ml-2 h-10 w-10 rounded bg-white cursor-pointer">
                                            <Menu size="24" />
                                        </div>

                                        {/* Logo */}
                                        <div className="font-bold flex items-center gap-2 text-black dark:text-white">
                                            <Link to={config.routes.HOME.PATH}>
                                                <img
                                                    src={Logo}
                                                    alt=""
                                                    className="h-7 rounded-lg"
                                                />
                                            </Link>
                                            <span className="font-thin italic">
                                                TravelBlog
                                            </span>
                                        </div>
                                    </li>

                                    <hr className="mx-2 my-2 bg-slate-100 h-[2px]" />

                                    {sidebarAdminData.map((link) => (
                                        <li
                                            key={link.id}
                                            className={`${
                                                isOpenSidebar
                                                    ? 'opacity-100'
                                                    : 'opacity-0 hidden'
                                            } transition-all duration-150 text-nowrap`}
                                        >
                                            <NavLink
                                                to={link.path}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? 'flex items-center gap-5 flex-nowrap bg-red-200 py-2 px-2 rounded-md mr-2 font-bold'
                                                        : 'flex items-center gap-5 px-2 mr-2'
                                                }
                                            >
                                                <span className="p-2 flex-shrink-0 bg-white rounded">
                                                    <link.icon />
                                                </span>
                                                <span>{link.name}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>

                    {/* Overlay */}
                    {isOpenSidebar && (
                        <div
                            onClick={() => setIsOpenSidebar(false)}
                            className="bg-black opacity-70 fixed z-[99] inset-0"
                        ></div>
                    )}
                </aside>

                <div className="flex flex-grow flex-col">
                    {/* Header */}
                    <header className="sticky z-[98] top-0 right-0 bg-white flex items-center justify-between gap-3 w-full py-3 px-4 shadow-lg">
                        <div
                            onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                            className="inline-block md:hidden p-2 bg-white relative top-0 left-0 cursor-pointer rounded shadow-md"
                        >
                            <Menu size="25" />
                        </div>
                        <h1 className="hidden md:block text-xl text-primary font-bold">
                            Admin Panel
                        </h1>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="hidden md:block border border-secondary-border py-1 px-4 rounded-md outline-none flex-grow max-w-[600px]"
                        />
                        <div className="flex relative group group-hover:block cursor-pointer">
                            <div className="flex items-center gap-4">
                                <span className="font-semibold text-secondary-text text-nowrap">
                                    Xin chào, Admin
                                </span>
                                <span className="h-10 w-10 flex-shrink-0 rounded-full bg-primary"></span>
                            </div>

                            <div className="absolute top-[100%] pointer-events-none group-hover:pointer-events-auto right-0 p-3 opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-200 translate-y-[-10px] group-hover:translate-y-0">
                                <div
                                    onClick={() => {
                                        logout;
                                        navigate('/');
                                    }}
                                    className="bg-gray-100 dark:bg-black/80 shadow-md px-5 py-3 rounded-md cursor-pointer"
                                >
                                    Log out
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* Main content */}

                    <main className="w-full py-3 px-4 mt-7">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
