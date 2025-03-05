import Container from '../Container';
// Icons

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { defaultAvatar } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Features = () => {
    const { blogPosts } = useBlog();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndexLarge, setCurrentIndexLarge] = useState(0);

    let post = blogPosts[14];
    post = post || [];

    const nextSlideLarge = () => {
        setCurrentIndexLarge((prev) => (prev + 1) % blogPosts.length);
    };

    const PrevSlideLarge = () => {
        setCurrentIndexLarge(
            (prev) => (prev - 1 + blogPosts.length) % blogPosts.length,
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlideLarge, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-yellow-50 overflow-hidden" id="features-section">
            <Container>
                <div className="relative overflow-hidden">
                    <div
                        className="w-full flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${
                                currentIndexLarge * 100
                            }%)`,
                        }}
                    >
                        {blogPosts.map((post, index) => (
                            <div
                                key={index}
                                className="min-w-full px-10 grid lg:grid-cols-12 justify-between items-center py-[150px] h-screen w-full"
                            >
                                {/* Media */}
                                <div className="col-span-12 mx-auto lg:col-span-5 relative h-[270px] w-[270px] md:h-[470px] md:w-[470px]">
                                    <Link to={`/single-blog-post/${post.id}`}>
                                        <img
                                            src={post.backgroundImage}
                                            alt=""
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    </Link>
                                    <div className="flex flex-col gap-3 md:absolute z-20 top-1/2 right-[-50px]">
                                        {post.tags?.map((tag, index) => (
                                            <div
                                                key={index}
                                                className={`text-center even:border-red-400 rounded-full items-center gap-1 py-1 px-3 drop-shadow-md bg-white border-4 border-sky-600 font-medium uppercase`}
                                            >
                                                <p className="text-lg">{tag}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="hidden lg:block absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white drop-shadow-md p-5 pr-12 rounded-md">
                                        <p className="text-lg lg:text-xl font-medium w-full min-w-[300px] text-center">
                                            {post.title}
                                        </p>
                                    </div>
                                </div>
                                {/* List Comment */}
                                <div className="hidden lg:block col-span-12 lg:col-start-7 col-end-13 w-full overflow-hidden bg-white relative border rounded-lg shadow-lg">
                                    <ul
                                        className="flex gap-5 p-3 transition-transform duration-500 ease-in-out"
                                        style={{
                                            transform: `translateX(-${
                                                currentIndex * 100
                                            }%)`,
                                        }}
                                    >
                                        {post.comments?.length ? (
                                            post.comments?.map(
                                                (item, index) => (
                                                    <li
                                                        key={index}
                                                        className="min-w-full py-3 text-center px-5"
                                                    >
                                                        <p className="text-3xl italic">
                                                            "{item.comment}"
                                                        </p>
                                                        <p className="text-lg mt-5 text-secondary-text flex items-center justify-center gap-5">
                                                            <img
                                                                src={
                                                                    item.avatar ||
                                                                    defaultAvatar
                                                                }
                                                                alt="avatar"
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                            {item.username ??
                                                                'ẩn danh'}
                                                        </p>
                                                    </li>
                                                ),
                                            )
                                        ) : (
                                            <li className="text-center text-gray-500 py-5 mx-auto">
                                                📝 Chưa có bình luận nào. Hãy là
                                                người đầu tiên bình luận!
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-[30px] flex py-3 gap-10">
                        <Button
                            onClick={PrevSlideLarge}
                            className="py-3 w-[80px] scale-75 hover:scale-100 transition-all duration-150"
                        >
                            <ChevronLeft className="group-hover:-rotate-90 group-hover:translate-y-[-40px] group-hover:text-black" />
                        </Button>
                        <Button
                            onClick={nextSlideLarge}
                            className="py-3 w-[80px] scale-75 hover:text-[50px] hover:scale-100 hover:rotate-90 transition-all duration-150 group"
                        >
                            <ChevronRight className="group-hover:-rotate-90 group-hover:translate-y-[-40px] group-hover:text-black" />
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Features;
