import {
    ClockArrowDown,
    NotebookPen,
    PencilLine,
    Settings,
    User,
} from 'lucide-react';
import config from '../config';

type MenuUserType = {
    id: number;
    name: string;
    path: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const menuUserData: MenuUserType[] = [
    { id: 1, name: 'Tài khoản', icon: User, path: config.routes.USER.PROFILE },
    {
        id: 2,
        name: 'Bài viết mới',
        icon: PencilLine,
        path: config.routes.USER.CREATE_POST,
    },
    {
        id: 3,
        name: 'Bài viết của tôi',
        icon: NotebookPen,
        path: config.routes.USER.MY_POSTS,
    },
    {
        id: 4,
        name: 'Đang xét duyệt',
        icon: ClockArrowDown,
        path: config.routes.USER.PENDING_POSTS,
    },
    {
        id: 5,
        name: 'Cài đặt',
        icon: Settings,
        path: config.routes.USER.SETTING,
    },
];
