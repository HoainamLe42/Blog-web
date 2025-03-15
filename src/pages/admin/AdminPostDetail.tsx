import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

// ============ <> =============
import { User } from '../../types/AuthTypes';
import { BlogPost } from '../../types/BlogTypes';
import Container from '../../components/Container';
import { API_BASE_URL } from '../../context/BlogContext';
import { defaultAvatar } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
    calculateReadingTime,
    formatDate,
} from '../../utils/CurrencyFormatter';

const AdminPostDetail = () => {
    const { postId } = useParams<{ postId: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${API_BASE_URL}/blogPosts?id=${postId}`,
                );
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();
                setPost(data[0]);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [postId]);

    // Lấy info tác giả
    useEffect(() => {
        const fetchAuthor = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${API_BASE_URL}/users/${post?.userId}`,
                );
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data: User = await response.json();

                setAvatar(data.avatar || defaultAvatar);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthor();
    }, [post?.userId]);

    return (
        <div className="relative pb-[140px] dark:bg-black">
            <Container>
                {loading ? (
                    <LoadingSpinner />
                ) : (
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
                                        src={post?.backgroundImage}
                                        alt="Background Main"
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-h2 dark:text-white mt-7 md:mt-12 w-full sm:max-w-[80%]">
                            {post?.title}
                        </h2>

                        {/* Info */}
                        <div className="inline-flex gap-4 mt-7 border-b border-gray-400 pb-6">
                            <div className="h-16 w-16 object-cover flex-shrink-0 bg-red-200 border-secondary-border rounded-full">
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="dark:text-white font-semibold text-nowrap">
                                    {post?.author}
                                </p>
                                <div className="flex gap-3 flex-col sm:flex-row items-start sm:items-center text-secondary-text">
                                    <div className="flex items-center">
                                        <p className="text-nowrap">
                                            {formatDate(
                                                String(post?.createdAt),
                                            )}
                                        </p>
                                        <hr className="h-[70%] min-h-[20px] w-[1px] border border-secondary-border mx-4" />
                                        <p className="text-nowrap">
                                            {calculateReadingTime(
                                                post?.content ?? [],
                                            )}{' '}
                                            phút đọc
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        <ul className="flex flex-wrap gap-2 sm:ml-4">
                                            {post?.tags.map((tag, index) => (
                                                <li
                                                    key={index}
                                                    className="rounded-full text-nowrap capitalize bg-gray-200 dark:bg-white dark:bg-opacity-20 text-purple-500 dark:text-primary-text px-4 py-[2px] inline-block"
                                                >
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
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
                            {post?.content.map((section, index) => (
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
                )}
            </Container>
        </div>
    );
};

export default AdminPostDetail;
