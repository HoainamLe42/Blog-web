import { useState } from 'react';
import { ChevronLeft, CircleAlert, Mail } from 'lucide-react';

// ============ <> =============
import config from '../../config';
import Button from '../../components/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isMessage, setIsMessage] = useState<boolean>(false);
    console.log(isMessage);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            alert('Vui lòng nhập email!');
            return;
        }

        setSuccessMessage(`Liên kết đặt lại mật khẩu đã được gửi tới ${email}`);
        setIsMessage(true);
        setEmail('');
        // Test
        const jsonString = JSON.stringify(email, null, 2);
        alert(jsonString);
    };

    return (
        <div className="relative h-screen py-[140px] dark:bg-black">
            <section className="flex flex-shrink-0 flex-col items-center justify-center max-w-[430px] mx-auto p-7 rounded-xl bg-white dark:bg-gray-200 drop-shadow-lg">
                <CircleAlert color="blue" size="80px" />
                <h1 className="text-h4 my-3">Quên mật khẩu</h1>
                <p className="text-center text-secondary-text mb-7 px-6">
                    Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật
                    khẩu.
                </p>

                {successMessage && (
                    <p className="mb-3 text-sm text-green/95">
                        {successMessage}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
                    <div className="h-[50px] px-5 flex items-center gap-2 text-secondary-text border dark:border-black rounded-full focus:outline-none focus:ring-1 focus:ring-primary">
                        <Mail />
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="h-full w-full text-black focus:outline-none bg-transparent"
                        />
                    </div>

                    <Button type="submit" className="my-5 rounded-full">
                        Gửi
                    </Button>
                    <Button
                        to={config.routes.AUTH.SIGN_IN}
                        variant="outline"
                        className="flex items-center justify-center gap-2 text-secondary-text"
                    >
                        <ChevronLeft size="18px" />
                        Trở về trang đăng nhập
                    </Button>
                </form>
            </section>
        </div>
    );
};

export default ForgotPassword;
