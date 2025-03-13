import { Heart, MessageSquareMore, NotebookPen, Users } from 'lucide-react';
import { API_BASE_URL, useBlog } from '../../context/BlogContext';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { BlogPost } from '../../types/BlogTypes';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { blogPosts, loading, getTotalComment } = useBlog();
    const [totalMember, setTotalMember] = useState<number>(0);
    const { user } = useAuth();
    console.log(user);

    // Get total member
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users`);

                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }

                const users = await response.json();
                setTotalMember(users.length);
            } catch (error) {
                console.error('Lỗi khi lấy data Users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Get most popular post
    const mostCommentedPost = blogPosts.reduce<BlogPost | null>((max, post) => {
        if (max === null) {
            return post;
        }
        return (post.comments?.length ?? 0) > (max.comments?.length ?? 0)
            ? post
            : max;
    }, null);

    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <section className="">
                    <h2 className="text-h2">Dashboard</h2>
                    <div className="bg-gray-200 h-full w-full min-h-[600px] mt-4 p-5 rounded-lg shadow-lg">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-9">
                            {/* Column 1 */}
                            <div className="md:col-span-8 md:row-span-2 p-4 rounded-md bg-white shadow-md">
                                <div>
                                    <h2 className="font-bold text-secondary-text mb-4">
                                        Total statistics
                                    </h2>

                                    <ul className="flex flex-col items-center sm:flex-row justify-evenly gap-3">
                                        <li className="flex gap-2">
                                            <span className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100 hidden sm:flex items-center justify-center">
                                                <NotebookPen size="14" />
                                            </span>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-3xl font-bold">
                                                    {blogPosts?.length ?? 0}
                                                </span>
                                                <p className="text-secondary-text">
                                                    Bài viết
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100 hidden sm:flex items-center justify-center">
                                                <Users size="14" />
                                            </span>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-3xl font-bold">
                                                    {totalMember ?? 0}
                                                </span>
                                                <p className="text-secondary-text">
                                                    Người dùng
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex gap-2">
                                            <span className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100 hidden sm:flex items-center justify-center">
                                                <MessageSquareMore size="14" />
                                            </span>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-3xl font-bold">
                                                    {getTotalComment()}
                                                </span>
                                                <p className="text-secondary-text">
                                                    Bình luận
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="md:col-span-4 md:row-span-5 p-4 rounded-md bg-white shadow-md">
                                <div className="flex flex-col justify-between h-full">
                                    <h2 className="font-bold text-secondary-text mb-4">
                                        Most popular post
                                    </h2>
                                    <div className="relative rounded-md overflow-hidden group cursor-pointer mb-2">
                                        <img
                                            src={
                                                mostCommentedPost?.backgroundImage
                                            }
                                            alt="Image"
                                        />
                                        <div className="absolute inset-0 h-0 p-4 opacity-100 bg-white/60 scale-0 group-hover:opacity-100 group-hover:h-full group-hover:scale-100 transition-all duration-500">
                                            <h3>{mostCommentedPost?.title}</h3>
                                            <ul className="flex flex-wrap mt-2">
                                                {mostCommentedPost?.tags.map(
                                                    (tag, index) => (
                                                        <li
                                                            key={index}
                                                            className="text-xs font-semibold py-1 px-2 bg-sky-300 rounded"
                                                        >
                                                            {tag}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                            <Button
                                                to={`/admin/post-detail/${mostCommentedPost?.id}`}
                                                className="text-sm px-4 py-2 w-[50%] mx-auto mt-10 scale-90 hover:scale-105 transition-all duration-200"
                                            >
                                                Xem
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-around gap-3">
                                        <p className="flex items-center gap-2 font-bold">
                                            <Heart size="20" color="red" />
                                            1.209k
                                            <span className="text-secondary-text">
                                                Likes
                                            </span>
                                        </p>
                                        <p className="flex items-center gap-2 font-bold">
                                            <MessageSquareMore
                                                size="20"
                                                color="gray"
                                            />
                                            {
                                                mostCommentedPost?.comments
                                                    ?.length
                                            }
                                            <span className="text-secondary-text">
                                                Comments
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3 */}
                            <div className="md:col-span-8 md:row-span-3 p-4 rounded-md bg-white shadow-md flex items-center justify-center">
                                <p className="text-xl animate-bounce">
                                    Soon...
                                </p>
                            </div>

                            {/* Column 4 */}
                            <div className="md:col-span-12 md:row-span-4 p-4 rounded-md bg-white shadow-md flex items-center justify-center">
                                <p className="text-xl animate-bounce">
                                    Soon...
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Dashboard;
