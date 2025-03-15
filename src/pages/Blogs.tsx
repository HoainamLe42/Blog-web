import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

// ============ <> =============
import Button from '../components/Button';
import { BlogPost } from '../types/BlogTypes';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import BlogSlider from '../components/BlogSlider';
import { API_BASE_URL } from '../context/BlogContext';
import LoadingSpinner from '../components/LoadingSpinner';

// Giá trị không thay đổi nên đặt bên ngoài
const LIMIT = 6;

const Blogs = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [start, setStart] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBlogs = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/blogPosts?status=approved&_start=${start}&_limit=${LIMIT}`,
            );
            if (!response.ok) throw new Error('Lỗi khi tải dữ liệu!');

            const data = await response.json();

            if (data?.length < LIMIT) {
                setHasMore(false);
            }

            setPosts((prev) => [...prev, ...data]);
        } catch (error) {
            console.error('Lỗi API: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [start]);

    const handleLoadMore = () => {
        setStart((prev) => prev + LIMIT);
    };

    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="relative pt-[100px] pb-[60px] md:py-[120px] dark:bg-black">
                    <Helmet>
                        <title>Trang Blogs | Website Blog</title>
                        <meta
                            name="description"
                            content="Trang danh sách blog của website Blog"
                        />
                    </Helmet>
                    <div>
                        <Container>
                            <div>
                                {/* Slideshow */}
                                <BlogSlider />

                                {/* Blog listing */}
                                <section className="mt-5 sm:mt-7 md:mt-10">
                                    <h3 className="text-xl sm:text-2xl md:text-h3 font-semibold ml-4 dark:text-white">
                                        Bài viết gần đây
                                    </h3>

                                    {/* Pagination (Phân trang) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-8">
                                        {posts.map((post) => (
                                            <BlogCard
                                                key={post.id}
                                                post={post}
                                            />
                                        ))}
                                    </div>
                                </section>

                                {/* Button Load More */}
                                {hasMore && (
                                    <div className="text-center mt-8">
                                        <Button
                                            onClick={handleLoadMore}
                                            variant="borderOnly"
                                            className="px-6 relative group hover:text-white"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? '...đang tải'
                                                : 'Xem thêm'}

                                            <span className="absolute z-[-1] inset-0 bg-primary w-[0%] group-hover:w-[100%] transition-all duration-300"></span>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Container>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blogs;
