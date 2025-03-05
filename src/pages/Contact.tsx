import { useState } from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import { contactData } from '../data/contactData';
import { API_BASE_URL } from '../context/BlogContext';
import { toast } from 'react-toastify/unstyled';

type ContactType = {
    name: string;
    email: string;
    title: string;
    message: string;
};

const Contact = () => {
    const [formData, setFormData] = useState<ContactType>({
        name: '',
        email: '',
        title: '',
        message: '',
    });
    const [errors, setErrors] = useState<Partial<ContactType>>({});

    const handleChangeInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = (): boolean => {
        let newErrors: Partial<ContactType> = {};

        if (!formData.name || !formData.name.trim())
            newErrors.name = 'Vui lòng nhập tên';

        if (!formData.email || !formData.email.trim())
            newErrors.email = 'Vui lòng nhập email';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = 'Email không hợp lệ';

        if (!formData.title || !formData.title.trim())
            newErrors.title = 'Vui lòng nhập tiêu đề';

        if (!formData.message || !formData.message.trim())
            newErrors.message = 'Vui lòng nhập nội dung';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await fetch(`${API_BASE_URL}/contacts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) throw new Error('Gửi liên hệ thất bại!');

                const data = await response.json();
                toast.success('Gửi thành công!');
                console.log('Response:', data);
                setFormData({ name: '', email: '', title: '', message: '' });
            } catch (error) {
                console.error('Lỗi gửi form:', error);
                alert('Đã có lỗi xảy ra, vui lòng thử lại!');
            }
        }
    };

    return (
        <div className="relative md:h-screen py-[100px] md:py-[140px] dark:bg-black">
            <Container>
                <h2 className="md:text-h2 text-4xl dark:text-white text-center">
                    Thông Tin Liên Hệ
                </h2>
                <div className="md:grid md:grid-cols-5 flex flex-col mt-10 min-h-[300px]">
                    {/* Col 1 */}
                    <div className="col-span-2 py-3 flex flex-col md:gap-10 gap-5">
                        <ul className="flex gap-3">
                            {contactData.socialLink.map((social, index) => (
                                <li
                                    key={index}
                                    className="flex gap-3 cursor-pointer"
                                >
                                    <span className="p-2 h-10 w-10 flex justify-center items-center border border-gray-400 rounded-md hover:border-primary hover:bg-primary transition-all duration-150">
                                        <social.icon className="w-4 dark:text-white" />
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-5">
                            <contactData.phone.icon className="w-6 text-primary" />
                            <div>
                                <p className="text-xl dark:text-white font-semibold">
                                    {contactData.phone.title}
                                </p>
                                <p className="text-secondary-text">
                                    {contactData.phone.value}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <contactData.email.icon className="w-6 text-primary" />
                            <div>
                                <p className="text-xl dark:text-white font-semibold">
                                    {contactData.email.title}
                                </p>
                                <p className="text-secondary-text">
                                    {contactData.email.value}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Col 2 */}
                    <div className="col-start-3 col-span-3 py-3">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex md:flex-row flex-col gap-3">
                                <div className="flex-1">
                                    <div className="border rounded-lg h-[50px] overflow-hidden bg-white">
                                        <label htmlFor=""></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChangeInput}
                                            placeholder="Tên"
                                            className="h-full w-full focus:outline-none px-4"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="border rounded-lg h-[50px] overflow-hidden bg-white">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChangeInput}
                                            placeholder="Email"
                                            className="h-full w-full focus:outline-none px-4"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="border rounded-lg h-[50px] flex items-center px-4 overflow-hidden bg-white">
                                <label htmlFor=""></label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChangeInput}
                                    placeholder="Chủ đề"
                                    className="h-full w-full focus:outline-none"
                                />
                            </div>
                            {errors.title && (
                                <p className="text-red-500 text-sm">
                                    {errors.title}
                                </p>
                            )}

                            <div className="border rounded-lg px-4 py-3 overflow-hidden bg-white">
                                <label htmlFor=""></label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChangeInput}
                                    className="min-h-[200px] w-full focus:outline-none"
                                    placeholder="Nội dung"
                                ></textarea>
                            </div>
                            {errors.message && (
                                <p className="text-red-500 text-sm">
                                    {errors.message}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="max-w-[200px] mt-2"
                            >
                                Gửi
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Contact;
