import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../context/BlogContext';
import { BlogPost } from '../../types/BlogTypes';
import Container from '../../components/Container';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Facebook, Linkedin, Twitter, X } from 'lucide-react';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import config from '../../config';
import {
    calculateReadingTime,
    formatDate,
} from '../../utils/CurrencyFormatter';
import { toast } from 'react-toastify/unstyled';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [tagInput, setTagInput] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Lấy data từ postId về chỉnh sửa
    useEffect(() => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${API_BASE_URL}/blogPosts?id=${id}`,
                );
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const editPost = await response.json();
                if (editPost.length > 0) {
                    setPost(editPost[0]);
                } else {
                    console.warn('Không tìm thấy bài viết');
                }
            } catch (error) {
                console.error('Lỗi HTTP', error);
            } finally {
                setLoading(false);
                setIsSubmitting(false);
            }
        };

        fetchPost();
    }, [id]);

    console.log('Data: ', post);

    const handleChange = (key: string, value: string) => {
        setPost((prev) => {
            if (!prev) return prev;
            return { ...prev, [key]: value };
        });
    };

    const handleContentChange = (index: number, key: string, value: string) => {
        setPost((prev) => {
            if (!prev) return prev;
            const updatedContent = prev?.content ? [...prev.content] : [];
            if (!updatedContent[index]) return prev;
            updatedContent[index] = {
                ...updatedContent[index],
                [key]: value,
            };
            return { ...prev, content: updatedContent };
        });
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();

            const newTag = tagInput.trim().toLocaleLowerCase();
            if (!post?.tags.includes(newTag)) {
                setPost((prev) => {
                    if (!prev) return prev;
                    return { ...prev, tags: [...prev?.tags, newTag] };
                });
            }
            setTagInput('');
        }
    };
    const removeTag = (tagToRemove: string) => {
        setPost((prev) => {
            if (!prev) return prev;
            const updatedTag = prev?.tags ? [...prev.tags] : [];
            return {
                ...prev,
                tags: updatedTag.filter((tag) => tag !== tagToRemove),
            };
        });
    };

    const handlePreview = () => {
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const handleSave = await fetch(`${API_BASE_URL}/blogPosts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });

            if (handleSave.ok) {
                toast.success('Bài viết đã được cập nhật!');
            }
        } catch (error) {
            console.error(error);
            console.error('Lỗi khi cập nhật:', error);
        }
    };

    return (
        <section className="py-[80px] bg-gray-200 min-h-screen">
            <Container>
                <h2 className="text-h2 text-center">Edit Blog Post</h2>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <form onSubmit={handleSubmit} className="flex mt-8">
                        {/* Col 1 */}
                        <div className="w-[30%]">
                            <div className="flex flex-col gap-4">
                                {/* Title Input */}
                                <div>
                                    <label className="px-2 text-sm font-bold">
                                        Tiêu đề
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={post?.title}
                                        onChange={(e) =>
                                            handleChange(
                                                'title',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Tiêu đề chính"
                                        className="w-full h-[48px] px-3 rounded-lg"
                                    />
                                </div>
                                {/* author Input */}
                                <div>
                                    <label className="px-2 text-sm font-bold">
                                        Tác giả
                                    </label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={post?.author}
                                        onChange={(e) =>
                                            handleChange(
                                                'author',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Tác giả"
                                        className="w-full h-[48px] px-3 rounded-lg"
                                    />
                                </div>
                                {/* Tags Input */}
                                <div>
                                    <label className="px-2 text-sm font-bold">
                                        Tags
                                    </label>
                                    {/* Show tags */}
                                    <ul className="flex gap-1 flex-wrap my-2 capitalize">
                                        {post?.tags.map((tag, index) => (
                                            <li
                                                key={index}
                                                className="relative px-4 py-2 bg-primary/60 text-white rounded-lg"
                                            >
                                                {tag}
                                                <span
                                                    onClick={() =>
                                                        removeTag(tag)
                                                    }
                                                    className="absolute top-[5%] right-[2%] cursor-pointer"
                                                >
                                                    <X size={'13'} />
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(e.target.value)
                                        }
                                        onKeyDown={handleAddTag}
                                        placeholder="Nhập tag và nhấn Enter"
                                        className="w-full h-[48px] px-3 rounded-lg"
                                    />
                                </div>
                                {/* BackgroundImage Input */}
                                <div>
                                    <label className="px-2 text-sm font-bold">
                                        Ảnh chính
                                    </label>
                                    <input
                                        type="text"
                                        name="backgroundImage"
                                        value={post?.backgroundImage}
                                        onChange={(e) => {
                                            handleChange(
                                                'backgroundImage',
                                                e.target.value,
                                            );
                                        }}
                                        placeholder="URL ảnh nền"
                                        className="w-full h-[48px] px-3 rounded-lg"
                                    />
                                </div>
                                {post?.backgroundImage && (
                                    <img
                                        src={post?.backgroundImage}
                                        alt="BackgroundImage"
                                        className="mt-2 rounded-lg w-full"
                                    />
                                )}
                                {/* Button handlePreview */}
                                <Button
                                    type="button"
                                    onClick={handlePreview}
                                    className="h-[48px] mt-5 flex items-center justify-center bg-gray-400 hover:bg-black"
                                >
                                    Xem trước
                                </Button>
                                <Button
                                    type="submit"
                                    className="h-[48px] mt-5 flex items-center justify-center"
                                >
                                    Lưu
                                </Button>
                                <Link
                                    to={config.routes.HOME.PATH}
                                    className="text-blue"
                                >
                                    Trang chủ
                                </Link>
                            </div>
                        </div>
                        {/* Col 2 */}
                        <div className="w-[70%] pl-5">
                            <div className="flex flex-col gap-4 mt-6">
                                {/* Hiển thị nội dung */}
                                {post?.content.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-lg"
                                    >
                                        {item.type === 'text' && (
                                            <textarea
                                                className="w-full min-h-[100px] p-3 rounded-lg"
                                                placeholder="Nhập nội dung văn bản"
                                                value={item.content}
                                                onChange={(e) =>
                                                    handleContentChange(
                                                        index,
                                                        'content',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        )}

                                        {item.type === 'title' && (
                                            <input
                                                type="text"
                                                className="w-full p-3 rounded-lg"
                                                placeholder="Nhập tiêu đề nhỏ"
                                                value={item.title}
                                                onChange={(e) =>
                                                    handleContentChange(
                                                        index,
                                                        'title',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        )}

                                        {item.type === 'image' && (
                                            <>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 rounded-lg"
                                                    placeholder="Nhập URL hình ảnh"
                                                    value={item.src}
                                                    onChange={(e) =>
                                                        handleContentChange(
                                                            index,
                                                            'src',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {item.src && (
                                                    <img
                                                        src={item.src}
                                                        alt="Preview"
                                                        className="mt-2 rounded-lg w-full"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                )}

                {/* Review */}
                <div
                    className={`fixed inset-0 p-10 w-full h-screen flex items-center justify-center ${
                        isOpen ? 'fixed' : 'hidden'
                    }`}
                >
                    <span
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute top-[10%] right-[2%] cursor-pointer bg-sky-300"
                    >
                        <X size={'20'} />
                    </span>
                    <div className="bg-white shadow-lg w-full h-full rounded-lg overflow-y-auto">
                        <div className="relative pt-[120px] pb-[140px] dark:bg-black">
                            <Container>
                                <section>
                                    {/* Media */}
                                    <div className="relative border border-secondary-border rounded-lg overflow-hidden">
                                        <div className="w-full h-[450px] bg-gray-200 text-secondary-text text-3xl flex items-center justify-center">
                                            <img
                                                src={post?.backgroundImage}
                                                alt=""
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                    </div>
                                    <h2 className="text-h2 dark:text-white mt-12 max-w-[80%]">
                                        {post?.title}
                                    </h2>
                                    <div className="inline-flex gap-4 mt-7 border-b border-gray-400 pb-6">
                                        <span className="h-16 w-16 object-cover flex-shrink-0 bg-red-200 border-secondary-border rounded-full"></span>
                                        <div className="flex flex-col justify-center">
                                            <p className="dark:text-white font-semibold">
                                                {post?.author}
                                            </p>
                                            <div className="flex items-center text-secondary-text">
                                                <p className="">
                                                    {formatDate(
                                                        String(post?.createdAt),
                                                    )}
                                                </p>
                                                <hr className="h-[70%] w-[1px] border border-secondary-border mx-4" />
                                                <p>
                                                    {calculateReadingTime(
                                                        post?.content ?? [],
                                                    )}{' '}
                                                    phút đọc
                                                </p>

                                                <ul className="flex gap-2 ml-4">
                                                    {post?.tags.map(
                                                        (tag, index) => (
                                                            <li
                                                                key={index}
                                                                className="rounded-full capitalize bg-gray-200 dark:bg-white dark:bg-opacity-20 text-purple-500 dark:text-primary-text px-4 py-[2px] inline-block"
                                                            >
                                                                {tag}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Icons */}
                                    <div className="flex gap-3 mt-5">
                                        <span className="h-9 w-9 rounded-md border border-primary flex items-center justify-center bg-primary cursor-pointer">
                                            <Facebook
                                                size="15px"
                                                color="white"
                                            />
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
                                        <div className="text-lg">
                                            {post?.content.map(
                                                (section, index) => {
                                                    if (
                                                        section.type === 'text'
                                                    ) {
                                                        return (
                                                            <p
                                                                key={index}
                                                                className="text-secondary-text my-5"
                                                            >
                                                                {
                                                                    section.content
                                                                }
                                                            </p>
                                                        );
                                                    }
                                                    if (
                                                        section.type === 'title'
                                                    ) {
                                                        return (
                                                            <h3
                                                                key={index}
                                                                className="text-h3 dark:text-white font-semibold mt-10 my-5"
                                                            >
                                                                {section.title}
                                                            </h3>
                                                        );
                                                    }
                                                    if (
                                                        section.type === 'image'
                                                    ) {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="w-full h-[470px] rounded-lg overflow-hidden mt-5 my-5"
                                                            >
                                                                <img
                                                                    src={
                                                                        section.src
                                                                    }
                                                                    alt={
                                                                        section.alt
                                                                    }
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                },
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </Container>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default EditPost;
