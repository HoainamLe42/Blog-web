import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify/unstyled';

// ============ <> =============
import { User } from '../../types/AuthTypes';
import { API_BASE_URL } from '../../context/BlogContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmationModal from '../../components/ConfirmationModal';

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isBannedModalOpen, setIsBannedModalOpen] = useState<boolean>(false);
    const [isActiveModalOpen, setIsActiveModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Delete User
    const deleteUser = async (userId: string) => {
        setUsers((prev) => prev.filter((user) => user.id !== userId));

        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete user');

            toast.success('Xoá thành công!');
            setIsDeleteModalOpen(false);

            console.log(`User ${userId} deleted successfully`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // BanUser
    const banUser = async (userId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'banned' }),
            });

            if (!response.ok) throw new Error('Failed to ban user');

            toast.error(`Đã chặn người dùng này!`);
            setIsBannedModalOpen(false);
            fetchUsers();

            console.log(`User ${userId} has been banned.`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Active User
    const activeUser = async (userId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'active' }),
            });

            if (!response.ok) throw new Error('Failed to ban user');

            toast.success(`Đã bỏ chặn người dùng này!`);
            setIsActiveModalOpen(false);
            fetchUsers();

            console.log(`User ${userId} has been banned.`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Lỗi khi tải danh sách người dùng:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section>
            <h2 className="text-2xl font-bold mb-5 text-center">
                Quản lý Người Dùng
            </h2>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="hidden md:block">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-3">ID</th>
                                    <th className="border p-3">Tên</th>
                                    <th className="border p-3">Email</th>
                                    <th className="border p-3">Vai trò</th>
                                    <th className="border p-3">Trạng thái</th>
                                    <th className="border p-3">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border text-center"
                                    >
                                        <td className="border p-3">
                                            <Link
                                                to={`/admin/users/${user.id}`}
                                            >
                                                {user.id}
                                            </Link>
                                        </td>
                                        <td className="border p-3">
                                            {user.username}
                                        </td>
                                        <td className="border p-3">
                                            {user.email}
                                        </td>
                                        <td className="border p-3">
                                            {user.role}
                                        </td>
                                        <td
                                            className={`border p-3 ${
                                                user.status === 'active'
                                                    ? 'text-green'
                                                    : 'text-red-500'
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <p className="font-bold">
                                                    {user.status}
                                                </p>
                                                <span
                                                    className={`h-2 w-2 ${
                                                        user.status === 'active'
                                                            ? 'bg-green'
                                                            : 'bg-red-500'
                                                    } block rounded-full`}
                                                ></span>
                                            </div>
                                        </td>
                                        <td className="border p-3 flex justify-center gap-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user);

                                                    if (
                                                        user.status === 'active'
                                                    ) {
                                                        setIsBannedModalOpen(
                                                            true,
                                                        );
                                                    } else {
                                                        setIsActiveModalOpen(
                                                            true,
                                                        );
                                                    }
                                                }}
                                                className={`px-3 py-1 rounded text-white ${
                                                    user.status === 'active'
                                                        ? 'bg-red-500'
                                                        : 'bg-green'
                                                }`}
                                            >
                                                {user.status === 'active'
                                                    ? 'Chặn'
                                                    : 'Mở khóa'}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsDeleteModalOpen(true);
                                                    setSelectedUser(user);
                                                }}
                                                className="bg-gray-500 px-3 py-1 text-white rounded"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile */}
                    <div className="flex flex-col md:hidden">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {users.map((user) => (
                                <li
                                    key={user.id}
                                    className=" flex flex-col gap-1 shadow-md p-4 bg-gray-100 rounded"
                                >
                                    <p className="font-bold text-center">
                                        {user.username}
                                    </p>
                                    <Link
                                        to={`/admin/users/${user.id}`}
                                        className="text-center text-secondary-text"
                                    >
                                        ID: <span>{user.id}</span>
                                    </Link>
                                    <p>
                                        Email: <span>{user.email}</span>
                                    </p>
                                    <p>
                                        Role: <span>{user.role}</span>
                                    </p>
                                    <p>
                                        Status:{' '}
                                        <span
                                            className={`font-semibold ${
                                                user.status === 'active'
                                                    ? 'text-green'
                                                    : 'text-red-500'
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </p>
                                    <div className="border p-3 flex justify-center gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user);

                                                if (user.status === 'active') {
                                                    setIsBannedModalOpen(true);
                                                } else {
                                                    setIsActiveModalOpen(true);
                                                }
                                            }}
                                            className={`px-3 py-1 rounded text-white ${
                                                user.status === 'active'
                                                    ? 'bg-red-500'
                                                    : 'bg-green-500'
                                            }`}
                                        >
                                            {user.status === 'active'
                                                ? 'Chặn'
                                                : 'Mở khóa'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsDeleteModalOpen(true);
                                                setSelectedUser(user);
                                            }}
                                            className="bg-gray-500 px-3 py-1 text-white rounded"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Confirm delete user */}
                    <ConfirmationModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={() => deleteUser(selectedUser?.id || '')}
                    >
                        <p className="text-lg font-bold mt-3">
                            {selectedUser?.username}
                        </p>
                        <p className="text-secondary-text mt-2">
                            Bạn có chắc chắn muốn xoá ?
                        </p>
                    </ConfirmationModal>

                    {/* Confirm ban-user */}
                    <ConfirmationModal
                        isOpen={isBannedModalOpen}
                        onClose={() => setIsBannedModalOpen(false)}
                        onConfirm={() => banUser(selectedUser?.id || '')}
                    >
                        <p className="text-lg font-bold mt-3">
                            {selectedUser?.username}
                        </p>
                        <p className="text-secondary-text mt-2">
                            Bạn có chắc chắn muốn chặn ?
                        </p>
                    </ConfirmationModal>

                    {/* Confirm active-user */}
                    <ConfirmationModal
                        isOpen={isActiveModalOpen}
                        onClose={() => setIsActiveModalOpen(false)}
                        onConfirm={() => activeUser(selectedUser?.id || '')}
                    >
                        <p className="text-lg font-bold mt-3">
                            {selectedUser?.username}
                        </p>
                        <p className="text-secondary-text mt-2">
                            Bạn có chắc chắn muốn mở chặn ?
                        </p>
                    </ConfirmationModal>
                </>
            )}
        </section>
    );
};

export default ManageUsers;
