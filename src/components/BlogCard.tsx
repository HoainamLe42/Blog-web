import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types/BlogTypes';
import { formatDate } from '../utils/CurrencyFormatter';
import { defaultAvatar } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../context/BlogContext';
import AOS from 'aos';

const BlogCard = ({
    userId,
    id,
    tags,
    backgroundImage,
    title,
    author,
    createdAt,
    status,
    content,
}: BlogPost) => {
    const navigate = useNavigate();
    const [userAvatar, setUserAvatar] = useState<string>('');

    const imagePost = content.filter((item) => item.type === 'image')[1]?.src;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/users?id=${userId}`,
                );
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const editPost = await response.json();

                if (editPost.length > 0) {
                    setUserAvatar(editPost[0]?.avatar || '');
                } else {
                    console.warn('Không tìm thấy bài viết');
                }
            } catch (error) {
                console.error('Lỗi HTTP', error);
            }
        };

        fetchPost();
    }, [userId]);

    useEffect(() => {
        AOS.init();
        AOS.refresh();

        return () => AOS.refresh();
    }, []);

    return (
        <div
            data-aos="zoom-in"
            onClick={() => navigate(`/single-blog-post/${id}`)}
            className="border border-gray-200 dark:border-white shadow-lg p-5 md:p-4 rounded-md cursor-pointer hover:scale-105 transition-all duration-200 flex flex-col h-full group"
        >
            <div className="w-full h-[200px] sm:h-[280px] md:h-[240px] bg-gray-200 rounded-md overflow-hidden text-secondary-text text-3xl flex items-center justify-center relative">
                <img
                    src={backgroundImage}
                    alt="backgroundMain"
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:opacity-0"
                />
                <img
                    src={imagePost || backgroundImage}
                    alt=""
                    loading="lazy"
                    className="w-full h-full absolute inset-0 object-cover transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
            </div>
            <ul className="flex gap-2 flex-wrap mt-5">
                {tags.map((tag, index) => (
                    <li
                        key={index}
                        className="rounded-full capitalize text-sm md:text-lg text-nowrap bg-gray-200 dark:bg-white dark:bg-opacity-20 text-purple-500 dark:text-primary-text px-4 py-[2px] inline-block"
                    >
                        {tag}
                    </li>
                ))}
            </ul>
            <div className="flex flex-col flex-1 mt-4">
                <h4 className="text-lg sm:text-xl md:text-h4 dark:text-white line-clamp-2">
                    {title}
                </h4>
                <div className="mt-auto">
                    <div className="flex items-center gap-3 mt-1 md:mt-5 text-sm text-secondary-text">
                        <div className="h-9 w-9 rounded-full bg-gray-200 flex-shrink-0">
                            <img
                                src={userAvatar ? userAvatar : defaultAvatar}
                                alt="Avatar user"
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                        <span className="text-sm">{author}</span>
                        <hr className="h-[15px] w-[1px] border border-secondary-border mx-[2px]" />
                        <span className="text-xs md:text-sm">
                            {formatDate(createdAt)}
                        </span>
                    </div>
                </div>
                {status === 'pending' && (
                    <p className="mt-3 text-primary text-center tracking-widest animate-bounce">
                        Pending...
                    </p>
                )}
                {status === 'rejected' && (
                    <p className="mt-3 text-red-500 text-center">
                        Không được duyệt
                    </p>
                )}
            </div>
        </div>
    );
};

export default BlogCard;
