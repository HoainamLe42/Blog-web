import { useState } from 'react';
import { toast } from 'react-toastify/unstyled';
import { Facebook, Linkedin, Twitter, X } from 'lucide-react';

// ============ <> =============
import Button from '../../components/Button';
import { BlogPost } from '../../types/BlogTypes';
import Container from '../../components/Container';
import { API_BASE_URL } from '../../context/BlogContext';
import { defaultAvatar, useAuth } from '../../context/AuthContext';
import {
    calculateReadingTime,
    formatDate,
} from '../../utils/CurrencyFormatter';

const CreateBlogPost = () => {
    const { user } = useAuth();
    const [post, setPost] = useState<BlogPost>({
        id: String(Date.now()),
        userId: user?.id,
        title: '',
        author: '',
        createdAt: new Date().toISOString(),
        backgroundImage: '',
        content: [],
        tags: [],
        comments: [],
        status: 'pending',
    });

    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState<Partial<BlogPost>>({});
    const [message, setMessage] = useState<string>('');
    console.log(message);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleAddContent = (type: string) => {
        setPost((prev) => ({
            ...prev,
            content: [...prev.content, { type }],
        }));
    };

    const handleContentChange = (index: number, key: string, value: string) => {
        setPost((prev) => {
            const updatedContent = [...prev.content];
            updatedContent[index] = { ...updatedContent[index], [key]: value };
            return { ...prev, content: updatedContent };
        });
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();

            const newTag = tagInput.trim().toUpperCase();
            if (!post.tags.includes(newTag)) {
                setPost((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setPost({
            ...post,
            tags: post.tags.filter((tag) => tag !== tagToRemove),
        });
    };

    // Remove input use index
    const removeInput = (inputToRemove: number) => {
        setPost({
            ...post,
            content: post?.content?.filter(
                (_, index) => index !== inputToRemove,
            ),
        });
    };

    const validate = (): boolean => {
        const newErrors: Partial<BlogPost> = {};

        if (!post.title || !post.title.trim()) {
            newErrors.title = 'Tiêu đề không được để trống.';
        }
        if (!post.author || !post.author.trim()) {
            newErrors.author = 'Tác giả không được để trống.';
        }
        if (!post.backgroundImage || !post.backgroundImage.trim()) {
            newErrors.backgroundImage = 'Background Image không được để trống.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePreview = () => {
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (validate()) {
            try {
                const createResponse = await fetch(
                    `${API_BASE_URL}/blogPosts`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(post),
                    },
                );

                if (createResponse.ok) {
                    setMessage('Thành công.');
                    toast.success('Bài viết đã được gửi đi.');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // console.log('useId: ', user?.id);
    console.log('newPost: ', post.content);

    return (
        <div className="bg-gray-200 min-h-screen px-4 py-3 w-full">
            <h2 className="text-h2 text-center my-4 md:my-7 lg:my-12">
                Create Blog Post
            </h2>
            <form onSubmit={handleSubmit} className="flex mt-5 md:mt-8 w-full">
                {/* Col 1 */}
                <div className="w-[30%] min-w-[210px]">
                    <div className="flex flex-col gap-2 sm:gap-4">
                        {/* Title Input */}
                        <input
                            type="text"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            placeholder="Tiêu đề chính"
                            className="w-full h-[48px] px-3 rounded-lg"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm ml-1">
                                {errors.title}
                            </p>
                        )}

                        {/* author Input */}
                        <input
                            type="text"
                            name="author"
                            value={post.author}
                            onChange={handleChange}
                            placeholder="Tác giả"
                            className="w-full h-[48px] px-3 rounded-lg"
                        />
                        {errors.author && (
                            <p className="text-red-500 text-sm ml-1">
                                {errors.author}
                            </p>
                        )}

                        {/* Show tags */}
                        {post.tags.length > 0 && (
                            <ul className="flex gap-1 flex-wrap">
                                {post.tags.map((tag, index) => (
                                    <li
                                        key={index}
                                        className="relative capitalize px-4 py-2 bg-primary/60 text-white rounded-lg"
                                    >
                                        {tag}
                                        <span
                                            onClick={() => removeTag(tag)}
                                            className="absolute top-[5%] right-[2%] cursor-pointer"
                                        >
                                            <X size={'13'} />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Tags Input */}
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder="Nhập tag và nhấn Enter"
                            className="w-full h-[48px] px-3 rounded-lg"
                        />

                        {/* BackgroundImage Input */}
                        <input
                            type="text"
                            name="backgroundImage"
                            value={post.backgroundImage}
                            onChange={handleChange}
                            placeholder="URL ảnh nền"
                            className="w-full h-[48px] px-3 rounded-lg"
                        />
                        {post.backgroundImage && (
                            <img
                                src={post.backgroundImage}
                                alt="BackgroundImage"
                                className="mt-2 rounded-lg w-full"
                            />
                        )}
                        {errors.backgroundImage && (
                            <p className="text-red-500 text-sm ml-1">
                                {errors.backgroundImage}
                            </p>
                        )}

                        {/* Hiển thị nội dung mobile */}
                        <div className="flex md:hidden flex-col gap-1 sm:gap-4 mt-2 w-full">
                            {post.content.map((item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg relative w-full"
                                >
                                    {item.type === 'text' && (
                                        <div className="relative">
                                            <span
                                                onClick={() =>
                                                    removeInput(index)
                                                }
                                                className="absolute right-[1%] top-[7%] cursor-pointer text-secondary-text"
                                            >
                                                <X size={15} />
                                            </span>
                                            <textarea
                                                className="w-full min-h-[100px] p-3 rounded-lg"
                                                placeholder="Nhập nội dung văn bản"
                                                value={item.content || ''}
                                                onChange={(e) =>
                                                    handleContentChange(
                                                        index,
                                                        'content',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    )}

                                    {item.type === 'title' && (
                                        <div className="relative">
                                            <span
                                                onClick={() =>
                                                    removeInput(index)
                                                }
                                                className="absolute right-[1%] top-[7%] cursor-pointer text-secondary-text"
                                            >
                                                <X size={15} />
                                            </span>
                                            <input
                                                type="text"
                                                className="w-full p-3 rounded-lg mb-1"
                                                placeholder="Nhập tiêu đề nhỏ"
                                                value={item.title || ''}
                                                onChange={(e) =>
                                                    handleContentChange(
                                                        index,
                                                        'title',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    )}

                                    {item.type === 'image' && (
                                        <div className="relative">
                                            <span
                                                onClick={() =>
                                                    removeInput(index)
                                                }
                                                className="absolute right-[1%] top-[7%] cursor-pointer text-secondary-text"
                                            >
                                                <X size={15} />
                                            </span>
                                            <input
                                                type="text"
                                                className="w-full p-3 rounded-lg mb-1"
                                                placeholder="Nhập URL hình ảnh"
                                                value={item.src || ''}
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
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Button handlePreview */}
                        <Button
                            type="button"
                            onClick={handlePreview}
                            className="h-[48px] mt-2 md:mt-5 flex items-center justify-center bg-gray-400 hover:bg-black"
                        >
                            Xem trước
                        </Button>
                        <Button
                            type="submit"
                            className="h-[48px] mt-2 md:mt-5 flex items-center justify-center"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                        </Button>
                    </div>
                </div>
                {/* Col 2 */}
                <div className="w-[70%] pl-5">
                    {/* Add nội dung PC */}
                    <div className="flex flex-col gap-2 sm:gap-4 w-full">
                        {post.content.map((item, index) => (
                            <div
                                key={index}
                                className="hidden md:block border rounded-lg relative w-full"
                            >
                                {item.type === 'text' && (
                                    <div className="relative">
                                        <span
                                            onClick={() => removeInput(index)}
                                            className="absolute right-[1%] top-[7%] cursor-pointer text-secondary-text"
                                        >
                                            <X size={15} />
                                        </span>
                                        <textarea
                                            className="w-full min-h-[100px] p-3 rounded-lg"
                                            placeholder="Nhập nội dung văn bản"
                                            value={item.content || ''}
                                            onChange={(e) =>
                                                handleContentChange(
                                                    index,
                                                    'content',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                )}

                                {item.type === 'title' && (
                                    <div className="relative">
                                        <span
                                            onClick={() => removeInput(index)}
                                            className="absolute right-[1%] top-[7%] cursor-pointer text-secondary-text"
                                        >
                                            <X size={15} />
                                        </span>
                                        <input
                                            type="text"
                                            className="w-full p-3 rounded-lg"
                                            placeholder="Nhập tiêu đề nhỏ"
                                            value={item.title || ''}
                                            onChange={(e) =>
                                                handleContentChange(
                                                    index,
                                                    'title',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                )}

                                {item.type === 'image' && (
                                    <div className="relative">
                                        <span
                                            onClick={() => removeInput(index)}
                                            className="absolute right-[1%] top-[7%] cursor-pointer text-secondary-text"
                                        >
                                            <X size={15} />
                                        </span>
                                        <input
                                            type="text"
                                            className="w-full p-3 rounded-lg"
                                            placeholder="Nhập URL hình ảnh"
                                            value={item.src || ''}
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
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Thêm nội dung */}
                        <div className="flex flex-col md:flex-row gap-2">
                            <button
                                type="button"
                                onClick={() => handleAddContent('text')}
                                className="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded bg-sky-400"
                            >
                                + Thêm Văn Bản
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAddContent('title')}
                                className="bg-green-500 text-white px-4 py-2 rounded bg-green"
                            >
                                + Thêm Tiêu Đề
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAddContent('image')}
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                + Thêm Ảnh
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Review */}
            <div
                className={`fixed inset-0 m-0 lg:m-10 lg:mx-auto p-0 lg:p-10 lg:w-[80%] h-screen ${
                    isOpen ? 'fixed' : 'hidden'
                } bg-white shadow-lg rounded-lg`}
            >
                <div className="flex flex-col p-2 lg:p-6 w-full h-full overflow-y-auto">
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        className="h-6 p-1 md:h-10 w-6 md:w-10 cursor-pointer flex items-center justify-center"
                    >
                        X
                    </Button>
                    <div className="relative py-4 sm:py-6 lg:py-10 dark:bg-black">
                        <Container>
                            <section>
                                {/* Media */}
                                <div className="relative border border-secondary-border rounded-lg overflow-hidden">
                                    <div className="w-full h-[220px] sm:h-[300px] md:h-[490px] bg-gray-200 text-secondary-text text-3xl flex items-center justify-center">
                                        <img
                                            src={post?.backgroundImage}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-h2 dark:text-white mt-7 md:mt-12 w-full sm:max-w-[80%]">
                                    {post?.title}
                                </h2>

                                {/* Info */}
                                <div className="inline-flex gap-4 mt-7 border-b border-gray-400 pb-6">
                                    <div className="h-16 w-16 object-cover flex-shrink-0 bg-red-200 border-secondary-border rounded-full">
                                        <img
                                            src={user?.avatar || defaultAvatar}
                                            alt=""
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
                                                <hr className="h-[70%] w-[1px] border border-secondary-border mx-4" />
                                                <p className="text-nowrap">
                                                    {calculateReadingTime(
                                                        post?.content ?? [],
                                                    )}{' '}
                                                    phút đọc
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                                <ul className="flex gap-2 sm:ml-4">
                                                    {post?.tags.map(
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
                                        <div
                                            key={index}
                                            className="text-lg my-5"
                                        >
                                            {section.type === 'text' && (
                                                <p className="text-secondary-text">
                                                    {section.content}
                                                </p>
                                            )}
                                            {section.type === 'image' && (
                                                <div className="w-full h-[220px] md:h-[300px] lg:h-[470px] rounded-lg overflow-hidden mt-5">
                                                    <img
                                                        src={section.src}
                                                        alt={section.alt}
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
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBlogPost;
