export enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
    Editor = 'EDITOR',
}

// When Sign In
export type SignInRequest = {
    email: string;
    password: string;
};

// When Sign UP
export type SignUpRequest = {
    id?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    username: string;
    avatar?: null;
    role?: UserRole.User;
    status?: 'active';
};

// when need to compare "role"
export type User = {
    id: string;
    email: string;
    password: string;
    username: string;
    phone?: string;
    avatar: string | null;
    role: UserRole.User | UserRole.Admin | UserRole.Editor;
    status: 'active' | 'banned';
};
