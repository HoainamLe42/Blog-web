import { EllipsisVertical, Send } from 'lucide-react';
import { BlogPost, Comment } from '../types/BlogTypes';
import { useEffect, useState } from 'react';
import { defaultAvatar, useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../context/BlogContext';
import LoadingSpinner from './LoadingSpinner';

type CommentsProps = {
    isShowComments: boolean;
    postId?: string;
    authorId?: string;
};

const Comments = ({ isShowComments, postId, authorId }: CommentsProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    // Lấy danh sách bình luận từ API
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/blogPosts/${postId}`,
                );
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                let data: BlogPost = await response.json();
                //    Nếu undefined thì lấy []
                const comments = data.comments ?? [];
                setComments(comments);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            }
        };

        fetchPost();
    }, [postId]);

    // Remove Comments
    const removeComment = async (commentId: string) => {
        setComments((prev) =>
            prev.filter((comment) => String(comment.id) !== commentId),
        );

        try {
            const response = await fetch(
                `${API_BASE_URL}/blogPosts/${postId}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        comments: comments?.filter(
                            (comment) => comment.id !== commentId,
                        ),
                    }),
                },
            );
            if (response.ok) {
                await fetchComments();
            }
        } catch (error) {
            console.error('Lỗi khi xóa comment:', error);
        }
    };

    const handleSubmit = async () => {
        if (!newComment.trim()) return;
        console.log(newComment);

        const newCommentData: Comment = {
            id: String(Date.now()),
            userId: user?.id ?? '',
            username: user?.username || 'Người dùng ẩn danh',
            avatar: user?.avatar,
            comment: newComment,
            createdAt: new Date().toISOString(),
        };

        const updatedComments = [...comments, newCommentData];

        const response = await fetch(`${API_BASE_URL}/blogPosts/${postId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comments: updatedComments }),
        });
        if (response.ok) {
            //   alert('Bình luận thành công!');
            await fetchComments();
        }
        setNewComment('');
        console.log(newCommentData);
    };

    const createComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            //   Khi ấn Enter gửi newComment request API, cập nhật dữ liệu trên server
            handleSubmit();
            //   setNewComment('');
        }
    };

    // Cập nhật lại Comments
    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/blogPosts/${postId}`);
            if (!response.ok) {
                throw new Error(`HTTP lỗi! status: ${response.status}`);
            }
            let data: BlogPost = await response.json();
            //    Nếu undefined thì lấy []
            const comments = data.comments ?? [];
            setComments(comments);
        } catch (error) {
            console.error('Lỗi HTTP', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className={`fixed top-0 z-[1000] right-0 h-full w-[73%] md:w-[30%] bg-white shadow-lg transition-transform duration-400 ${
                isShowComments ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="relative flex flex-col h-full">
                <h4 className="text-h4 p-4">Bình luận</h4>

                {/* List comment */}
                <div
                    className="border overflow-hidden overflow-y-auto"
                    style={{ height: 'calc(100% - 60px)' }}
                >
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <ul className="flex flex-col mt-1 gap-1">
                            {/* Item */}
                            {comments?.map((comment) => (
                                <li
                                    key={comment.id}
                                    className="relative flex gap-3 py-1 px-4 pr-12 cursor-pointer hover:bg-gray-200"
                                >
                                    <span className="h-8 w-8 flex-shrink-0 rounded-full bg-sky-400 overflow-hidden">
                                        <img
                                            src={
                                                comment.avatar ?? defaultAvatar
                                            }
                                            alt="Avatar"
                                        />
                                    </span>
                                    <p>
                                        <span className="bg-yellow-400 py-[2px] px-2 rounded mr-2">
                                            {comment.username}
                                        </span>
                                        {comment.comment}
                                    </p>
                                    {comment.createdAt === undefined ? (
                                        ''
                                    ) : (
                                        <small className="text-secondary-text absolute top-[5px] right-[10px]">
                                            {new Date(
                                                comment.createdAt,
                                            ).toLocaleTimeString('vi-VN', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </small>
                                    )}

                                    {/* Remove Comments */}
                                    <div className="absolute bottom-0 right-0">
                                        <div className="absolute bottom-[2px] right-[10px] group">
                                            <EllipsisVertical size={15} />

                                            <div className="hidden p-2 group-hover:flex absolute z-10 top-0 right-0">
                                                <ul className="flex-col bg-gray-300 p-2 shadow-md rounded">
                                                    <li className="text-nowrap text-secondary-text hover:text-black">
                                                        Chi tiết
                                                    </li>
                                                    {/* Quyền xoá comments */}
                                                    {authorId === user?.id && (
                                                        <li
                                                            onClick={() =>
                                                                removeComment(
                                                                    comment.id,
                                                                )
                                                            }
                                                            className="text-nowrap text-secondary-text hover:text-black"
                                                        >
                                                            Xoá
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Create Comments */}
                <form
                    onSubmit={handleSubmit}
                    className="border flex items-center justify-center"
                >
                    <textarea
                        placeholder="Viết bình luận..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={createComment}
                        className="p-2 w-full min-h-[60px] focus:outline-none resize-none"
                    ></textarea>
                    <button
                        type="submit"
                        className="text-secondary-text flex items-center px-6 h-full cursor-pointer border-l"
                    >
                        <Send />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Comments;
