import UserLayout from '../../layouts/UserLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import BlogCard from '../../components/BlogCard';
import { useBlog } from '../../context/BlogContext';

const MyPosts = () => {
    const { filteredMyPost, loading } = useBlog();
    console.log('Check Data: ', filteredMyPost);

    return (
        <UserLayout>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <section className="py-3 px-4 overflow-y-auto h-screen">
                    <h2 className="text-h2 text-center my-4 md:my-7 lg:my-12">
                        My Blogs
                    </h2>

                    {/* List Post */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredMyPost.map((post) => (
                            <BlogCard key={post.id} {...post} />
                        ))}
                    </div>
                </section>
            )}
        </UserLayout>
    );
};

export default MyPosts;
