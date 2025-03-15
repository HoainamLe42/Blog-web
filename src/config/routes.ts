const routes = {
    HOME: {
        PATH: '/',
    },
    BLOG: {
        LISTING: '/blogs',
        SINGLE_POST: 'single-blog-post/:postId',
    },
    INFO: {
        ABOUT: '/about',
        CONTACT: '/contact',
    },
    AUTH: {
        SIGN_IN: '/sign-in',
        SIGN_UP: '/sign-up',
        FORGOT_PASSWORD: '/forgot-password',
        RESET_PASSWORD: '/reset-password/:token',
    },
    USER: {
        PROFILE: '/profile',
        CREATE_POST: '/create-blog-post',
        MY_POSTS: '/my-blogs',
        PENDING_POSTS: '/pending-posts',
        EDIT_POST: 'edit-post/:id',
        SETTING: '/setting',
    },
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        MANAGE_COMMENTS: '/admin/manage-comments',
        MANAGE_POSTS: '/admin/manage-post',
        MANAGE_USERS: '/admin/manage-users',
        ADMIN_POST_DETAIL: '/admin/post-detail/:postId',
        BLOG_LIST: '/admin/users/:userId',
    },
};

export default routes;
