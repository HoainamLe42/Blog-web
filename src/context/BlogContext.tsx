// export const API_BASE_URL = 'http://localhost:5004';
export const API_BASE_URL = 'https://2g4qz3-8088.csb.app';

import { createContext, useContext, useEffect, useState } from 'react';
import { BlogPost } from '../types/BlogTypes';
import { useAuth } from './AuthContext';

type BlogContextProps = {
    blogPosts: BlogPost[];
    filteredMyPost: BlogPost[];
    loading: boolean;
    scrollToNextSection: (value: string) => void;
    getTotalComment: () => number;
};

const BlogContext = createContext<BlogContextProps | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { userId } = useAuth();

    const scrollToNextSection = (idSection: string) => {
        const nextSection = document.getElementById(idSection);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Show posts with status approved
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/blogPosts`);
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data: BlogPost[] = await response.json();
                setBlogPosts(data);
            } catch (error) {
                console.error('Lỗi khi tải Blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    // 1. MyPost
    const filteredMyPost = blogPosts.filter(
        (post) => Number(post.userId) === Number(userId),
    );

    // Get total comment
    const getTotalComment = () => {
        const totalComment = blogPosts.reduce(
            (totalAmount, item) => totalAmount + (item.comments?.length ?? 0),
            0,
        );
        return totalComment;
    };

    return (
        <BlogContext.Provider
            value={{
                blogPosts,
                loading,
                scrollToNextSection,
                filteredMyPost,
                getTotalComment,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog phải được sử dụng trong BlogProvider');
    }
    return context;
};
