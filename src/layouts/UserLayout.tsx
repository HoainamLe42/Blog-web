import { Menu } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { menuUserData } from '../data/menuUserData';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import config from '../config';
import Logo from '../assets/images/logo.webp';
import { Helmet } from 'react-helmet-async';

const UserLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
    const location = useLocation();

    useEffect(() => {
        setIsOpenSidebar(false);
    }, [location]);

    return (
        <div className="h-screen">
            <Helmet>
                <title>Profile | Website Blog</title>
                <meta
                    name="description"
                    content="Trang thông tin người dùng của website Blog"
                />
            </Helmet>
            <div className="flex flex-col sm:flex-row">
                {/* SideBar  */}
                <aside
                    className={`${
                        isOpenSidebar
                            ? 'w-[20%] min-w-[206px] '
                            : 'w-[5%] min-w-[72px]'
                    } border border-r-gray-200 shadow-lg bg-gray-100 h-screen transition-all duration-200 hidden sm:block`}
                >
                    <div className="flex items-center gap-5">
                        <div
                            onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                            className="p-2 bg-white relative top-0 left-0 inline-block cursor-pointer rounded ml-4 mt-2 shadow-md"
                        >
                            <Menu size="25" />
                        </div>
                        {isOpenSidebar && (
                            <Link
                                to={config.routes.HOME.PATH}
                                className="text-lg font-semibold mt-3 text-nowrap uppercase cursor-pointer"
                            >
                                Trang chủ
                            </Link>
                        )}
                    </div>

                    <hr className="mx-2 my-2" />
                    <nav>
                        <ul className="flex flex-col gap-4 ml-2 mt-8">
                            {menuUserData.map((link) => (
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
                <aside className="relative flex sm:hidden justify-center px-2 py-4 bg-gray-100">
                    <div
                        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                        className="absolute top-2 left-4 p-2 bg-white cursor-pointer rounded shadow-md"
                    >
                        <Menu size="24" />
                    </div>
                    {/* Logo */}
                    <div className="font-bold flex items-center gap-2 text-black dark:text-white">
                        <Link to={config.routes.HOME.PATH}>
                            <img src={Logo} alt="" className="h-7 rounded-lg" />
                        </Link>
                        <span className="font-thin italic">TravelBlog</span>
                    </div>

                    <div
                        className={`h-screen absolute z-[99] top-0 left-0 ${
                            isOpenSidebar ? ' w-[70%]' : 'w-0'
                        } transition-all duration-200 bg-gray-200`}
                    >
                        {isOpenSidebar && (
                            <nav>
                                <ul className="flex flex-col gap-4 ml-2 mt-2">
                                    <li
                                        onClick={() =>
                                            setIsOpenSidebar(!isOpenSidebar)
                                        }
                                        // className="relative h-10 w-10 ml-2 p-2 bg-white cursor-pointer rounded"
                                        className="flex items-center gap-10"
                                    >
                                        <div className="flex items-center justify-center ml-2 h-10 w-10 rounded bg-white cursor-pointer">
                                            <Menu size="24" />
                                        </div>
                                        <Link
                                            to={config.routes.HOME.PATH}
                                            className="text-lg font-semibold mt-3 text-nowrap uppercase cursor-pointer"
                                        >
                                            Trang chủ
                                        </Link>
                                    </li>

                                    <hr className="mx-2 my-2 bg-slate-100 h-[2px]" />

                                    {menuUserData.map((link) => (
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
                            className="bg-black opacity-70 fixed z-[98] inset-0"
                        ></div>
                    )}
                </aside>

                {/* Main content */}
                <main className="overflow-y-auto w-full">{children}</main>
            </div>
        </div>
    );
};

export default UserLayout;
