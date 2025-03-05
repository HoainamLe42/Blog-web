import { Facebook, Linkedin, Twitter } from 'lucide-react';
import {
    calculateReadingTime,
    formatDate,
} from '../../utils/CurrencyFormatter';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../types/BlogTypes';
import { API_BASE_URL } from '../../context/BlogContext';
import Container from '../../components/Container';
import LoadingSpinner from '../../components/LoadingSpinner';
import { defaultAvatar } from '../../context/AuthContext';
import { User } from '../../types/AuthTypes';

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
        <div className="relative pt-[120px] pb-[140px] dark:bg-black">
            <Container>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <section>
                        {/* Media */}
                        <div className="relative border border-secondary-border rounded-lg overflow-hidden">
                            <div className="w-full h-[490px] bg-gray-200 text-secondary-text text-3xl flex items-center justify-center">
                                <img
                                    src={post?.backgroundImage}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <h2 className="text-h2 dark:text-white mt-12 max-w-[80%]">
                            {post?.title}
                        </h2>
                        <div className="inline-flex gap-4 mt-7 border-b border-gray-400 pb-6">
                            <div className="h-16 w-16 object-cover flex-shrink-0 bg-red-200 border-secondary-border rounded-full">
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="dark:text-white font-semibold">
                                    {post?.author}
                                </p>
                                <div className="flex items-center text-secondary-text">
                                    <p className="">
                                        {formatDate(String(post?.createdAt))}
                                    </p>
                                    <hr className="h-[70%] w-[1px] border border-secondary-border mx-4" />
                                    <p>
                                        {calculateReadingTime(
                                            post?.content ?? [],
                                        )}{' '}
                                        phút đọc
                                    </p>

                                    <ul className="flex gap-2 ml-4">
                                        {post?.tags.map((tag, index) => (
                                            <li
                                                key={index}
                                                className="rounded-full capitalize bg-gray-200 dark:bg-white dark:bg-opacity-20 text-purple-500 dark:text-primary-text px-4 py-[2px] inline-block"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
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
                                        <div className="w-full h-[470px] rounded-lg overflow-hidden mt-5">
                                            <img
                                                src={section.src}
                                                alt={section.alt}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}
                                    {section.type === 'title' && (
                                        <h3 className="text-h3 dark:text-white font-semibold mt-10">
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
