import { useEffect, useState } from 'react';
import { toast } from 'react-toastify/unstyled';

// ==============
import { Edit } from 'lucide-react';
import Button from '../../components/Button';
import { defaultAvatar, useAuth } from '../../context/AuthContext';
import UserLayout from '../../layouts/UserLayout';

import { API_BASE_URL } from '../../context/BlogContext';

const Profile = () => {
    const { userId, setUser, user } = useAuth();
    // const [activeTab, setActiveTab] = useState<'photo' | 'edit'>('photo');

    const [name, setName] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    // Lấy thông tin user khi vào trang
    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) {
                console.error('User ID is missing or invalid');
                return;
            }
            try {
                const response = await fetch(
                    `${API_BASE_URL}/users?id=${userId}`,
                );
                if (!response.ok) throw new Error('Failed to fetch user');

                const data = await response.json();

                console.log('>>Check user Fetch: ', data);

                if (data.length > 0) {
                    const userData = data[0];
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);
                    setName(userData.username || '');
                    setPhone(userData.phone || '');
                    setAvatarUrl(userData.avatar || defaultAvatar);
                }
            } catch (error) {
                console.error('Lỗi khi lấy user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    // Xử lý khi user chọn ảnh mới
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvatarUrl(e.target.value);
    };

    // Gửi request cập nhật thông tin user
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        const updatedUser = {
            ...user,
            avatar: avatarUrl,
            phone,
            username: name,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log('Updated: ', updatedData);
                setUser(updatedData);
                toast.success('Cập nhật thành công!');
            } else {
                toast.error('Có lỗi xảy ra khi cập nhật.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật user:', error);
            toast.error('Đã xảy ra lỗi.');
            alert('Đã xảy ra lỗi.');
        }
    };

    return (
        <UserLayout>
            <div className="py-3 px-4">
                <div className="flex flex-col items-center mt-16">
                    {/* Avatar */}
                    <div className="relative h-36 w-36 rounded-full bg-sky-300 flex items-center justify-center text-5xl font-semibold">
                        <img
                            src={avatarUrl}
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                        />

                        <span className="absolute bottom-0 right-[15%] h-8 w-8 flex items-center justify-center rounded-full border bg-white cursor-pointer group">
                            <Edit size="18" />
                            <ul className="absolute top-[0%] left-[100%] text-base font-normal bg-gray-300 shadow-md visible opacity-0 group-hover:flex group-hover:opacity-100 group-hover:top-[90%] flex-col rounded-md transition-all duration-300">
                                <li className="py-1 px-3">Photo</li>
                                <li className="py-1 px-3">Edit</li>
                            </ul>
                        </span>
                    </div>

                    <form
                        onSubmit={handleUpdate}
                        className="flex flex-col gap-4 mt-10"
                    >
                        <div className="flex items-center justify-between gap-5">
                            <label className="text-secondary-text">
                                Avatar:{' '}
                            </label>
                            <input
                                type="text"
                                value={avatarUrl || ''}
                                placeholder="Nhập URL ảnh"
                                onChange={handleAvatarChange}
                                className="h-10 px-3 rounded-lg border focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-5">
                            <label className="text-secondary-text">
                                Username:{' '}
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-10 px-3 rounded-lg border focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center justify-between gap-5">
                            <label className="text-secondary-text">
                                Email:{' '}
                            </label>
                            <input
                                type="text"
                                value={user?.email || ''}
                                className="h-10 px-3 rounded-lg border focus:outline-none"
                                disabled
                            />
                        </div>
                        <div className="flex items-center justify-between gap-5">
                            <label className="text-secondary-text">
                                Phone:{' '}
                            </label>
                            <input
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-10 px-3 rounded-lg border focus:outline-none"
                            />
                        </div>
                        <div className="mx-auto">
                            <Button
                                type="submit"
                                className="h-10 flex items-center mt-5 min-w-[140px]"
                            >
                                Lưu
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
};

export default Profile;
