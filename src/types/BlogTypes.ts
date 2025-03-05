export type Comment = {
    id: string;
    userId: string;
    username: string;
    avatar?: string | null;
    comment: string;
    createdAt: string;
};

export type BlogPost = {
    id?: string;
    userId?: string;
    title: string;
    author: string;
    createdAt: string;
    backgroundImage: string;
    content: {
        type: string;
        content?: string;
        src?: string;
        title?: string;
        alt?: string;
    }[];
    tags: string[];
    comments?: Comment[];
    status: 'pending' | 'approved' | 'rejected';
};

export type BlogPostCard = {
    id: number;
    title: string;
    content: string;
    category: string;
    images: [];
    author: string;
    createdAt: string;
};
