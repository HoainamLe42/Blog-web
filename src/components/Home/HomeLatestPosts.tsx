import Container from '../Container';
import Button from '../Button';
import BlogCard from '../BlogCard';
import { useBlog } from '../../context/BlogContext';
import config from '../../config';
import { ArrowDown } from 'lucide-react';

const HomeLatestPosts = () => {
    const { blogPosts, scrollToNextSection } = useBlog();
    const approvedPosts = blogPosts.filter(
        (post) => post.status === 'approved',
    );

    return (
        <section
            className="py-[50px] md:py-[80px] lg:pt-[150px] lg:pb-[80px]"
            id="lastsPost-section"
        >
            <Container>
                <div>
                    <h2 className="text-3xl md:text-h2 dark:text-white mb-[30px] md:mb-[60px]">
                        Latest Post
                    </h2>
                    {/* List item */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {approvedPosts.slice(0, 6).map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Button
                            to={config.routes.BLOG.LISTING}
                            variant="borderOnly"
                            className="relative group hover:text-white"
                        >
                            View All Post
                            <span className="absolute z-[-1] inset-0 bg-primary w-[0%] group-hover:w-[100%] transition-all duration-300"></span>
                        </Button>
                    </div>
                    <div className="text-center mt-20">
                        <Button
                            onClick={() =>
                                scrollToNextSection('features-section')
                            }
                            variant="outline"
                            className="text-black hover:text-yellow-300 w-fit inline-flex items-center gap-1 animate-bounce"
                        >
                            Scroll down
                            <ArrowDown size="18" />
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HomeLatestPosts;
