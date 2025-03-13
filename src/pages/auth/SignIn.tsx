// Icons social
import { useNavigate } from 'react-router-dom';

// Social Icons
import facebookIcons from '../../assets/images/social/fb.png';
import googleIcons from '../../assets/images/social//gg.png';
import appleIcons from '../../assets/images/social/apple.png';
import Button from '../../components/Button';
import config from '../../config';
import Container from '../../components/Container';
import { useState } from 'react';
import { SignInRequest, User, UserRole } from '../../types/AuthTypes';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../context/BlogContext';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignInRequest>({
        email: '',
        password: '',
    });
    const { login } = useAuth();
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<Partial<SignInRequest>>({});

    // Get value input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate;
    const validate = (): boolean => {
        const newErrors: Partial<SignInRequest> = {};

        if (!formData.email || !formData.email.trim()) {
            newErrors.email = 'Email không được để trống.';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = 'Email không hợp lệ.';
        }

        if (!formData.password || !formData.password.trim()) {
            newErrors.password = 'Mật khẩu không được để trống.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await fetch(`${API_BASE_URL}/users`);
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu người dùng');
                }
                const users: User[] = await response.json();

                const user: User | undefined = users.find(
                    (user) =>
                        user.email === formData.email &&
                        user.password === formData.password,
                );

                if (user) {
                    setMessage('Đăng nhập thành công.');
                    login(user);

                    if (user.role === UserRole.Admin) {
                        navigate(config.routes.ADMIN.DASHBOARD);
                    } else {
                        navigate(config.routes.HOME.PATH);
                        alert(`Hello ${user.username}`);
                    }
                } else {
                    setMessage('Mật khẩu hoặc email không đúng.');
                }
            } catch {
                console.log(errors);
                setMessage('Lỗi khi đăng nhập. Vui lòng thử lại.');
            }
        }

        // Test
        // const jsonString = JSON.stringify(formData, null, 2);
        // alert(jsonString);
    };

    return (
        <div className="relative md:h-screen pt-[100px] pb-[60px] md:py-[140px] bg-gray-100 dark:bg-black">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 transition-all duration-300">
                    {/* Bg */}
                    <div className="relative hidden md:flex items-center justify-center">
                        <h3 className="text-h3">Soon</h3>
                    </div>

                    {/* Sign In */}
                    <section className="flex flex-1 flex-col items-center justify-center max-w-[430px] w-full p-7 mx-auto rounded-xl bg-white drop-shadow-lg">
                        <h1 className="text-h4 mb-7">Đăng nhập</h1>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-full"
                        >
                            {/* Login with social account */}
                            <div className="flex flex-col gap-3">
                                <div className="md:h-[50px] h-[48px] w-full flex items-center justify-center gap-2 rounded-full border cursor-pointer hover:border-primary">
                                    <img
                                        src={facebookIcons}
                                        alt="Facebook Icon"
                                        className="h-6 object-cover"
                                    />
                                    <span>Đăng nhập với Facebook</span>
                                </div>
                                <div className="md:h-[50px] h-[48px] w-full flex items-center justify-center gap-2 rounded-full border cursor-pointer hover:border-primary">
                                    <img
                                        src={googleIcons}
                                        alt="Google Icon"
                                        className="h-6 object-cover"
                                    />
                                    <span>Đăng nhập với Facebook</span>
                                </div>

                                <div className="md:h-[50px] h-[48px] w-full flex items-center justify-center gap-2 rounded-full border cursor-pointer hover:border-primary">
                                    <img
                                        src={appleIcons}
                                        alt="Apple Icon"
                                        className="h-6 object-cover"
                                    />
                                    <span>Đăng nhập với Facebook</span>
                                </div>
                            </div>

                            <span className="py-4 text-2xl font-light text-secondary-text text-center">
                                OR
                            </span>

                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="md:h-[50px] h-[48px] px-5 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm ml-2 mt-1">
                                    {errors.email}
                                </p>
                            )}
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="md:h-[50px] h-[48px] px-5 mt-3 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm ml-2 mt-1">
                                    {errors.password}
                                </p>
                            )}
                            {message && (
                                <p className="mt-4 text-center text-red-500">
                                    {message}
                                </p>
                            )}
                            <p
                                onClick={() =>
                                    navigate(config.routes.AUTH.FORGOT_PASSWORD)
                                }
                                className="text-secondary-text mt-3 ml-auto cursor-pointer hover:text-primary"
                            >
                                Quên mật khẩu?
                            </p>
                            <Button
                                type="submit"
                                className="my-5 rounded-full md:h-[50px] h-[48px] flex items-center disabled:opacity-80"
                                disabled={!formData.email || !formData.password}
                            >
                                Đăng nhập
                            </Button>
                            <p className="text-secondary-text text-center">
                                Nếu chưa có tài khoản?{' '}
                                <Button
                                    to={config.routes.AUTH.SIGN_UP}
                                    variant="outline"
                                    className="text-black px-1 hover:text-primary hover:underline cursor-pointer"
                                >
                                    Đăng ký
                                </Button>
                            </p>
                        </form>
                    </section>
                </div>
            </Container>
        </div>
    );
};

export default SignIn;
