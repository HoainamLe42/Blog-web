import React from 'react';
import config from '../config';
import Setting from '../pages/user/Setting';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import BlogList from '../pages/admin/BlogList';

const HomePage = React.lazy(() => import('../pages/Home'));
const ContactPage = React.lazy(() => import('../pages/Contact'));
const BlogsPage = React.lazy(() => import('../pages/Blogs'));
const SinglePostPage = React.lazy(() => import('../pages/SinglePost'));
const SignInPage = React.lazy(() => import('../pages/auth/SignIn'));
const SignUpPage = React.lazy(() => import('../pages/auth/SignUp'));
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'));
const Profile = React.lazy(() => import('../pages/user/Profile'));
const CreateBlogPost = React.lazy(() => import('../pages/user/CreateBlogPost'));
const MyPosts = React.lazy(() => import('../pages/user/MyPosts'));
const EditPost = React.lazy(() => import('../pages/user/EditPost'));
const PendingPosts = React.lazy(() => import('../pages/user/PendingPosts'));

// ADMIN
const Dashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const ManagePosts = React.lazy(() => import('../pages/admin/ManagePosts'));
const ManageUsers = React.lazy(() => import('../pages/admin/ManageUsers'));
const ManageComments = React.lazy(
    () => import('../pages/admin/ManageComments'),
);
const AdminPostDetail = React.lazy(
    () => import('../pages/admin/AdminPostDetail'),
);

type Route = {
    path: string;
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any> | null;
};

export const publicRoutes: Route[] = [
    { path: config.routes.HOME.PATH, component: HomePage },
    { path: config.routes.BLOG.LISTING, component: BlogsPage },
    { path: config.routes.BLOG.SINGLE_POST, component: SinglePostPage },
    { path: config.routes.INFO.CONTACT, component: ContactPage },
    { path: config.routes.AUTH.SIGN_IN, component: SignInPage },
    { path: config.routes.AUTH.SIGN_UP, component: SignUpPage },
    { path: config.routes.AUTH.FORGOT_PASSWORD, component: ForgotPassword },

    // USER
    {
        path: config.routes.USER.PROFILE,
        component: Profile,
        layout: UserLayout,
    },
    {
        path: config.routes.USER.CREATE_POST,
        component: CreateBlogPost,
        layout: UserLayout,
    },
    {
        path: config.routes.USER.MY_POSTS,
        component: MyPosts,
        layout: UserLayout,
    },
    {
        path: config.routes.USER.PENDING_POSTS,
        component: PendingPosts,
        layout: UserLayout,
    },
    {
        path: config.routes.USER.EDIT_POST,
        component: EditPost,
        layout: UserLayout,
    },
    {
        path: config.routes.USER.SETTING,
        component: Setting,
        layout: UserLayout,
    },

    // ADMIN
    {
        path: config.routes.ADMIN.DASHBOARD,
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: config.routes.ADMIN.MANAGE_POSTS,
        component: ManagePosts,
        layout: AdminLayout,
    },
    {
        path: config.routes.ADMIN.MANAGE_USERS,
        component: ManageUsers,
        layout: AdminLayout,
    },
    {
        path: config.routes.ADMIN.MANAGE_COMMENTS,
        component: ManageComments,
        layout: AdminLayout,
    },
    {
        path: config.routes.ADMIN.ADMIN_POST_DETAIL,
        component: AdminPostDetail,
        layout: AdminLayout,
    },
    {
        path: config.routes.ADMIN.BLOG_LIST,
        component: BlogList,
        layout: AdminLayout,
    },
];
