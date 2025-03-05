import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { API_BASE_URL } from '../../context/BlogContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { User } from '../../types/AuthTypes';

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-5 text-center">
                Quản lý Người Dùng
            </h2>
            {loading ? (
                <LoadingSpinner />
            ) : (
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
                            <tr key={user.id} className="border text-center">
                                <td className="border p-3">{user.id}</td>
                                <td className="border p-3">{user.username}</td>
                                <td className="border p-3">{user.email}</td>
                                <td className="border p-3">{user.role}</td>
                                <td
                                    className={`border p-3 ${
                                        user.status === 'active'
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <p className="text-green font-bold">
                                            {user.status}
                                        </p>
                                        <span className="h-2 w-2 bg-green block rounded-full"></span>
                                    </div>
                                </td>
                                <td className="border p-3 flex justify-center gap-3">
                                    <button
                                        // onClick={() =>
                                        //     toggleBanUser(user.id, user.status)
                                        // }
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
                                        // onClick={() => deleteUser(user.id)}
                                        className="bg-gray-500 px-3 py-1 text-white rounded"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
};

export default ManageUsers;
