import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';
import BlogCard from '../../components/BlogCard';

const PendingPosts = () => {
    const { user } = useAuth();
    const { blogPosts } = useBlog();

    const filteredPosts = blogPosts.filter(
        (post) => post.userId === user?.id && post.status === 'pending',
    );
    return (
        <div>
            <section className="py-3 px-4 overflow-y-auto h-screen">
                <h2 className="text-h2 text-center my-12">Pending Posts</h2>

                {/* List Post */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredPosts.map((post) => (
                            <BlogCard {...post} />
                        ))}
                    </div>
                ) : (
                    <p>Không có bài viết nào</p>
                )}
            </section>
        </div>
    );
};

export default PendingPosts;
