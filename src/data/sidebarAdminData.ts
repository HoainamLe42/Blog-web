import {
    LayoutDashboard,
    MessageSquareText,
    PencilLine,
    UsersRound,
} from 'lucide-react';
import config from '../config';

type SidebarAdminType = {
    id: number;
    name: string;
    path: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const sidebarAdminData: SidebarAdminType[] = [
    {
        id: 1,
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: config.routes.ADMIN.DASHBOARD,
    },
    {
        id: 2,
        name: 'Quản lý bài viết',
        icon: PencilLine,
        path: config.routes.ADMIN.MANAGE_POSTS,
    },
    {
        id: 3,
        name: 'Quản lý người dùng',
        icon: UsersRound,
        path: config.routes.ADMIN.MANAGE_USERS,
    },
    {
        id: 4,
        name: 'Quản lý bình luận',
        icon: MessageSquareText,
        path: config.routes.ADMIN.MANAGE_COMMENTS,
    },
    // {
    //     id: 5,
    //     name: 'Cài đặt',
    //     icon: Settings,
    //     path: config.routes.ADMIN.MANAGE_COMMENTS,
    // },
];
