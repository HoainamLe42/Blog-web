// Icons social
import facebookIcons from '../../assets/images/social/fb.png';
import googleIcons from '../../assets/images/social//gg.png';
import appleIcons from '../../assets/images/social/apple.png';
import Button from '../../components/Button';
import config from '../../config';
import { useState } from 'react';
import { SignUpRequest, User, UserRole } from '../../types/AuthTypes';
import Container from '../../components/Container';

const SignUp = () => {
    const API_BASE_URL = 'http://localhost:5004';
    const [formData, setFormData] = useState<SignUpRequest>({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<Partial<SignUpRequest>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = (): boolean => {
        const newErrors: Partial<SignUpRequest> = {};

        if (!formData.email || !formData.email.trim()) {
            newErrors.email = 'Email không được để trống.';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = 'Email không hợp lệ.';
        }
        if (!formData.username || !formData.username.trim()) {
            newErrors.username = 'username không được để trống.';
        }
        if (!formData.password || !formData.password.trim()) {
            newErrors.password = 'Mật khẩu không được để trống.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword =
                'Mật khẩu và xác nhận mật khẩu không khớp.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) {
            try {
                // Kiểm tra sự trùng lập
                const response = await fetch(`${API_BASE_URL}/users`);
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu người dùng');
                }
                const existingUsers: User[] = await response.json();
                const userExists = existingUsers.some(
                    (user) => user.email === formData.email,
                );
                if (userExists) {
                    setMessage('Email đã tồn tại, vui lòng dùng email khác.');
                    return;
                }

                const generateId = () => String(Date.now());
                const newUser: SignUpRequest = {
                    id: generateId(),
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    avatar: null,
                    status: 'active',
                    role: UserRole.User,
                };

                // Thêm tài khoản mới
                const createResponse = await fetch(`${API_BASE_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });

                if (createResponse.ok) {
                    setMessage('Đăng ký tài khoản thành công.');
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                    // Test
                    const jsonString = JSON.stringify(formData, null, 2);
                    alert(jsonString);
                }
            } catch (error) {
                console.error(error);
                setMessage('Lỗi tạo tài khoản, vui lòng thử lại');
            }
        }
    };
    return (
        <div className="relative pt-[100px] pb-[60px] md:py-[120px] bg-gray-100 dark:bg-black">
            <Container>
                <div className="flex flex-col items-center justify-center max-w-[430px] mx-auto p-7 rounded-xl bg-white drop-shadow-lg">
                    <h1 className="text-h4 mb-7">Đăng Ký</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="md:h-[50px] h-[48px] w-full flex items-center justify-center gap-2 rounded-full border cursor-pointer hover:border-primary">
                                <img
                                    src={facebookIcons}
                                    alt=""
                                    className="h-6 object-cover"
                                />
                                <span>Đăng nhập với Facebook</span>
                            </div>
                            <div className="md:h-[50px] h-[48px] w-full flex items-center justify-center gap-2 rounded-full border cursor-pointer hover:border-primary">
                                <img
                                    src={googleIcons}
                                    alt=""
                                    className="h-6 object-cover"
                                />
                                <span>Đăng nhập với Facebook</span>
                            </div>

                            <div className="md:h-[50px] h-[48px] w-full flex items-center justify-center gap-2 rounded-full border cursor-pointer hover:border-primary">
                                <img
                                    src={appleIcons}
                                    alt=""
                                    className="h-6 object-cover"
                                />
                                <span>Đăng nhập với Facebook</span>
                            </div>
                        </div>
                        <span className="py-3 text-2xl font-light text-secondary-text text-center">
                            OR
                        </span>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="md:h-[50px] h-[48px] px-5 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-2 ml-2">
                                {errors.username}
                            </p>
                        )}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="md:h-[50px] h-[48px] px-5 mt-3 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-2 ml-2">
                                {errors.email}
                            </p>
                        )}
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="md:h-[50px] h-[48px] px-5 mt-3 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-2 ml-2">
                                {errors.password}
                            </p>
                        )}
                        <input
                            type="text"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="md:h-[50px] h-[48px] px-5 mt-3 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-2 ml-2">
                                {errors.confirmPassword}
                            </p>
                        )}

                        {message && (
                            <p className="text-red-500 text-sm mt-2 ml-2">
                                {message}
                            </p>
                        )}
                        <Button className="my-5 rounded-full">Đăng ký</Button>
                        <p className="text-secondary-text text-center">
                            Nếu đã có tài khoản?{' '}
                            <Button
                                type="submit"
                                to={config.routes.AUTH.SIGN_IN}
                                variant="outline"
                                className="text-black px-1 hover:text-primary hover:underline cursor-pointer"
                            >
                                Đăng nhập
                            </Button>
                        </p>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default SignUp;
