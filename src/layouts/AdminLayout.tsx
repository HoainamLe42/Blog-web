import { Menu } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { sidebarAdminData } from '../data/sidebarAdminData';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

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
                {/* SideBar  */}
                <aside
                    className={`${
                        isOpenSidebar ? 'w-[20%]' : 'w-[5%]'
                    } border border-r-gray-200 shadow-lg bg-gray-100 h-screen transition-all duration-200`}
                >
                    <div
                        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                        className="p-2 bg-white relative top-0 left-0 inline-block cursor-pointer rounded ml-4 mt-2 shadow-md"
                    >
                        <Menu size="25" />
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

                <div className="flex flex-grow flex-col">
                    {/* Header */}
                    <header className="right-0 flex items-center justify-between gap-3 w-full py-3 px-4 shadow-lg">
                        <h1 className="text-xl text-primary font-bold">
                            Admin Panel
                        </h1>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-secondary-border py-1 px-4 rounded-md outline-none flex-grow max-w-[600px]"
                        />
                        <div className="flex relative group group-hover:block cursor-pointer">
                            <div className="flex items-center gap-4">
                                <span className="font-semibold text-secondary-text">
                                    Xin chào, Admin
                                </span>
                                <span className="h-10 w-10 rounded-full bg-primary"></span>
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

                    <main className="overflow-y-auto w-full py-3 px-4">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
