import { useEffect, useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { formatDate } from '../utils/CurrencyFormatter';
import { Link } from 'react-router-dom';

const BlogSlider = () => {
    const { blogPosts } = useBlog();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [blogPosts.length]);

    return (
        <div className="relative w-full h-[220px] sm:h-[340px] md:h-[400px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
            {blogPosts.map((post, index) => (
                <Link
                    key={post.id}
                    to={`/single-blog-post/${post.id}`}
                    className={`absolute w-full h-full transition-opacity duration-700 ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={post.backgroundImage}
                        alt="Background Main"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 p-3 sm:p-5 md:p-10">
                        <ul className="hidden md:flex flex-wrap gap-1 md:gap-2">
                            {post.tags.map((tag, index) => (
                                <li
                                    key={index}
                                    className="rounded-full text-nowrap text-sm md:text-lg capitalize bg-gray-200 dark:bg-white dark:bg-opacity-20 text-purple-500 dark:text-primary-text px-2 md:px-4 py-[2px] inline-block"
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                        <h2
                            className="mt-2 sm:mt-3 md:mt-4 line-clamp-2 text-2xl sm:text-3xl md:text-h2 text-white max-w-[80%] md:max-w-[74%]"
                            style={{
                                textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
                            }}
                        >
                            {post.title}
                        </h2>
                        <div className="flex items-center gap-3 mt-2 sm:mt-3 md:mt-5 text-white font-semibold text-sm">
                            <div className="h-9 w-9 rounded-full bg-gray-200 border border-secondary-border flex-shrink-0"></div>
                            <span className="bg-gray-400 py-1 px-2 bg-opacity-90 rounded text-xs md:text-sm">
                                {post.author}
                            </span>
                            <span className="bg-gray-400 py-1 px-2 bg-opacity-90 rounded text-xs md:text-sm">
                                {formatDate(post.createdAt)}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BlogSlider;
