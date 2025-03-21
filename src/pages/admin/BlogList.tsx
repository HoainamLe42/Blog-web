import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// ============ <> =============
import { User } from '../../types/AuthTypes';
import BlogCard from '../../components/BlogCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { API_BASE_URL, useBlog } from '../../context/BlogContext';
import { defaultAvatar, useAuth } from '../../context/AuthContext';

const BlogList = () => {
    const { userRole } = useAuth();
    const { userId } = useParams<{ userId: string }>();
    const { blogPosts, loading } = useBlog();
    const [user, setUser] = useState<User | null>(null);

    // Check Role
    if (userRole === 'ADMIN') {
        console.log('Bạn có quyền Admin!');
    } else if (userRole === 'USER') {
        console.log('Bạn là User thông thường.');
    } else {
        console.log('Không xác định role.');
    }

    // Get avatar user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                try {
                    const response = await fetch(
                        `${API_BASE_URL}/users?id=${userId}`,
                    );
                    if (!response.ok) {
                        throw new Error(`HTTP lỗi! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setUser(data[0]);
                } catch (error) {
                    console.error('Lỗi khi fetch data', error);
                }
            } catch (error) {
                console.error('Lỗi khi fetch data', error);
            }
        };

        fetchUser();
    }, [userId]);

    // Get blogs user
    const posts = blogPosts.filter((post) => post.userId === userId);

    return (
        <section className="flex flex-col gap-4 pb-20">
            <div className="flex items-center flex-col md:flex-row gap-6 md:gap-20">
                <div className="min-w-[250px] w-[30%] h-full flex flex-col items-center gap-4 border rounded-lg p-4">
                    <img
                        src={user?.avatar ?? defaultAvatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-xl text-center font-bold">
                            {user?.username}
                        </h2>
                        <p className="text-sm text-center text-gray-500 mt-1">
                            Tổng bài viết: {posts.length ?? 0}
                        </p>
                    </div>
                </div>
                {/* <h2 className="text-h2 font-bold mb-5 flex-grow flex items-center"> */}
                <h2 className="text-3xl md:text-h2 dark:text-white mb-5 font-bold flex-grow flex items-center">
                    Danh sách bài viết
                </h2>
            </div>

            {/* Danh sách Blog */}
            <>
                {loading ? (
                    <LoadingSpinner />
                ) : posts.length === 0 ? (
                    <p className="flex items-center justify-center mt-20 text-secondary-text text-lg">
                        Người dùng này chưa có bài viết.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <BlogCard
                                key={post.id}
                                post={post}
                                isAdmin={userRole === 'ADMIN'}
                            />
                        ))}
                    </div>
                )}
            </>
        </section>
    );
};

export default BlogList;
