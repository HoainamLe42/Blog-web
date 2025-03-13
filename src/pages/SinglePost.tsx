import {
    Edit,
    Facebook,
    Linkedin,
    MessageCircleMore,
    Twitter,
} from 'lucide-react';
import Container from '../components/Container';
import RelatedPosts from '../components/RelatedPosts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, useBlog } from '../context/BlogContext';
import { calculateReadingTime, formatDate } from '../utils/CurrencyFormatter';
import { defaultAvatar, useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Comments from '../components/Comments';
import { User } from '../types/AuthTypes';
import LoadingSpinner from '../components/LoadingSpinner';
import AOS from 'aos';
import { Helmet } from 'react-helmet-async';

const SinglePost = () => {
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);
    const { blogPosts, loading } = useBlog();
    const { postId } = useParams<{ postId: string }>();
    const { user } = useAuth();
    const [authorPost, setAuthorPost] = useState<User | null>(null);

    useEffect(() => {
        AOS.init();
        AOS.refresh();

        return () => AOS.refresh();
    }, []);

    const blogPost = blogPosts.find((blogPost) => blogPost.id === postId);

    const toggleComments = () => {
        setIsCommentsVisible(!isCommentsVisible);
    };

    useEffect(() => {
        if (isCommentsVisible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup: Ensure overflow-hidden is removed
        return () => document.body.classList.remove('overflow-hidden');
    }, [isCommentsVisible]);

    const relatedPosts = blogPosts.filter(
        (filterPosts) =>
            filterPosts?.id !== blogPost?.id &&
            filterPosts?.tags.some((tag) =>
                blogPost?.tags
                    ?.map((item) => item.toLowerCase())
                    .includes(tag.toLowerCase()),
            ),
    );

    // Fetch avatar user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/users?id=${blogPost?.userId}`,
                );
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();

                setAuthorPost(data[0]);
            } catch (error) {
                console.error('Lỗi khi fetch data', error);
            }
        };
        fetchUser();
    }, [blogPost?.userId]);

    // Filter avatar of main post
    const avatarSrc = authorPost?.avatar ? authorPost.avatar : defaultAvatar;

    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="relative pt-[100px] md:pt-[120px] pb-[60px] md:pb-[140px] dark:bg-black">
                    <Helmet>
                        <title>Trang bài viết | Website Blog</title>
                        <meta
                            name="description"
                            content="Trang bài viết của website Blog"
                        />
                    </Helmet>
                    <Container>
                        <section>
                            {/* Media */}
                            <div className="relative shadow-md rounded-lg overflow-hidden">
                                <div
                                    data-aos="zoom-in"
                                    className="w-full h-[220px] sm:h-[300px] md:h-[490px] bg-gray-200 text-secondary-text text-3xl flex items-center justify-center"
                                >
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <img
                                            src={blogPost?.backgroundImage}
                                            alt="Background Main"
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-h2 dark:text-white mt-7 md:mt-12 w-full sm:max-w-[80%]">
                                {blogPost?.title}
                            </h2>

                            {/* Info */}
                            <div className="inline-flex gap-4 mt-7 border-b border-gray-400 pb-6">
                                <div className="h-16 w-16 object-cover flex-shrink-0 bg-red-200 border-secondary-border rounded-full">
                                    <img
                                        src={avatarSrc}
                                        alt="Avatar"
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="dark:text-white font-semibold text-nowrap">
                                        {blogPost?.author}
                                    </p>
                                    <div className="flex gap-3 flex-col sm:flex-row items-start sm:items-center text-secondary-text">
                                        <div className="flex items-center">
                                            <p className="text-nowrap">
                                                {formatDate(
                                                    String(blogPost?.createdAt),
                                                )}
                                            </p>
                                            <hr className="h-[70%] min-h-[20px] w-[1px] border border-secondary-border mx-4" />
                                            <p className="text-nowrap">
                                                {calculateReadingTime(
                                                    blogPost?.content ?? [],
                                                )}{' '}
                                                phút đọc
                                            </p>
                                        </div>

                                        <div className="flex items-center">
                                            <ul className="flex flex-wrap gap-2 sm:ml-4">
                                                {blogPost?.tags.map(
                                                    (tag, index) => (
                                                        <li
                                                            key={index}
                                                            className="rounded-full text-nowrap capitalize bg-gray-200 dark:bg-white dark:bg-opacity-20 text-purple-500 dark:text-primary-text px-4 py-[2px] inline-block"
                                                        >
                                                            {tag}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>

                                            {blogPost?.userId === user?.id && (
                                                <Button
                                                    to={`/edit-post/${blogPost?.id}`}
                                                    className="ml-10 cursor-pointer p-2 sm:p-3 bg-primary/70 rounded-lg text-white hover:bg-primary transition-all duration-150 hover:scale-110"
                                                >
                                                    <Edit />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-3 mt-5">
                                <span className="h-9 w-9 rounded-md border border-primary flex items-center justify-center bg-primary cursor-pointer">
                                    <Facebook size="15px" color="white" />
                                </span>
                                <span className="h-9 w-9 rounded-md border border-black dark:border-white dark:text-white flex items-center justify-center cursor-pointer">
                                    <Linkedin size="15px" />
                                </span>
                                <span className="h-9 w-9 rounded-md border border-black dark:border-white dark:text-white flex items-center justify-center cursor-pointer">
                                    <Twitter size="15px" />
                                </span>
                            </div>

                            {/* Main Content */}
                            <div className="mt-10 max-w-[800px] mx-auto">
                                {blogPost?.content.map((section, index) => (
                                    <div key={index} className="text-lg my-5">
                                        {section.type === 'text' && (
                                            <p className="text-secondary-text">
                                                {section.content}
                                            </p>
                                        )}
                                        {section.type === 'image' && (
                                            <div
                                                data-aos="zoom-in"
                                                className="w-full h-[220px] md:h-[300px] lg:h-[470px] shadow-md rounded-lg overflow-hidden mt-5"
                                            >
                                                <img
                                                    src={section.src}
                                                    alt={section.alt}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        {section.type === 'title' && (
                                            <h3 className="text-2xl md:text-h3 dark:text-white font-semibold mt-10">
                                                {section.title}
                                            </h3>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Related Posts */}
                        <RelatedPosts relatedPosts={relatedPosts} />
                    </Container>

                    {/* Overlay */}
                    {isCommentsVisible && (
                        <div
                            onClick={toggleComments}
                            className="fixed inset-0 bg-black opacity-50 z-40"
                        ></div>
                    )}

                    {/* Icons Open Comment Sidebar */}
                    <div
                        onClick={toggleComments}
                        className="fixed bottom-[10%] right-[10%] text-blue cursor-pointer animate-bounce"
                    >
                        <MessageCircleMore size="30px" />
                    </div>

                    {/* Comment Sidebar */}
                    <Comments
                        isShowComments={isCommentsVisible}
                        postId={blogPost?.id}
                        authorId={blogPost?.userId}
                    />
                </div>
            )}
        </div>
    );
};

export default SinglePost;
