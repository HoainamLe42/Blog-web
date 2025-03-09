import { useEffect, useState } from 'react';
import { BlogPost } from '../../types/BlogTypes';
import { API_BASE_URL } from '../../context/BlogContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify/unstyled';

const ManagePosts = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Bài viết đợi duyệt
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${API_BASE_URL}/blogPosts?status=pending`,
                );
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                let data: BlogPost[] = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const updatePostStatus = async (id: number, newStatus: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/blogPosts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error('Lỗi cập nhật bài viết');

            setPosts((prev) => prev.filter((post) => Number(post.id) !== id));

            if (response.ok) {
                if (newStatus === 'approved') {
                    toast.success('Bài viết đã được duyệt!');
                } else {
                    toast.warning('Bài viết đã bị từ chối duyệt!');
                }

                await fetchBlogs();
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật bài viết:', error);
        } finally {
            setLoading(false);
        }
    };

    // Khi xét duyệt sẽ cập nhật lại posts
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/blogPosts?status=pending`,
            );
            if (!response.ok) {
                throw new Error(`HTTP lỗi! status: ${response.status}`);
            }
            let data: BlogPost[] = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Lỗi HTTP', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <h2 className="text-h2 text-center mb-5">Duyệt bài viết</h2>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    {posts.length === 0 ? (
                        <p>Không có bài viết nào chờ duyệt</p>
                    ) : (
                        <ul>
                            {posts.map((post) => (
                                <li key={post.id} className="border p-3 mb-3">
                                    <h3 className="font-bold">{post.title}</h3>
                                    {/* <p>{post?.content[0]}</p> */}
                                    <p className="text-sm text-gray-500">
                                        Tác giả: {post.author}
                                    </p>
                                    <div className="flex items-center justify-between mt-3">
                                        <Button
                                            onClick={() =>
                                                navigate(
                                                    `/admin/post-detail/${post.id}`,
                                                )
                                            }
                                            className="bg-sky-600 hover:bg-sky-600 hover:scale-105 transition-all duration-150 text-white px-5 py-1 rounded"
                                        >
                                            Xem
                                        </Button>
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={() =>
                                                    updatePostStatus(
                                                        Number(post.id),
                                                        'approved',
                                                    )
                                                }
                                                className="bg-green hover:bg-green hover:scale-105 transition-all duration-150 text-white px-3 py-1 rounded"
                                            >
                                                Duyệt
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    updatePostStatus(
                                                        Number(post.id),
                                                        'rejected',
                                                    )
                                                }
                                                className="hover:scale-105 transition-all duration-150 text-white px-3 py-1 rounded"
                                            >
                                                Từ chối
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </section>
    );
};

export default ManagePosts;
