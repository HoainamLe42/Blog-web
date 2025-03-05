import { Link } from 'react-router-dom';
import { BlogPost } from '../types/BlogTypes';
import Button from './Button';

type Props = {
    relatedPosts: BlogPost[];
};

const RelatedPosts = ({ relatedPosts }: Props) => {
    return (
        <section className="pt-[60px] md:pt-[120px] lg:pt-[150px]">
            <div>
                {/* Info */}
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl md:text-4xl lg:text-h2 dark:text-white">
                        Bài viết liên quan
                    </h2>
                </div>
            </div>

            {/* Blog listing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-7 sm:mt-10 md:mt-16">
                {relatedPosts.slice(0, 4).map((post) => (
                    <Link to={`/single-blog-post/${post.id}`} key={post.id}>
                        <div className="h-[220px] md:h-[300px] lg:h-[370px] rounded-xl overflow-hidden border">
                            <img
                                src={post.backgroundImage}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <h4 className="text-2xl lg:text-h4 dark:text-white mt-5">
                            {post.title}
                        </h4>
                        <p className="mt-4 text-secondary-text line-clamp-2">
                            {post.content[0].content}
                        </p>
                        <Button
                            variant="outline"
                            className="px-0 dark:text-white hover:text-primary dark:hover:text-primary"
                        >
                            Learn more
                        </Button>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedPosts;
