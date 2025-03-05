import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { menuUserData } from '../data/menuUserData';

const DropdownAvatar = () => {
    const { logout } = useAuth();
    return (
        <div className="absolute top-[100%] pointer-events-none group-hover:pointer-events-auto right-0 p-3 opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-200 translate-y-[-10px] group-hover:translate-y-0">
            <div className="bg-white dark:bg-black/80 shadow-md px-5 pt-3 rounded-md">
                <ul className="flex flex-col gap-4 text-nowrap text-base">
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

                    <li
                        onClick={logout}
                        className="flex items-center gap-4 border-t py-3 cursor-pointer"
                    >
                        <LogOut />
                        Đăng xuất
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DropdownAvatar;
