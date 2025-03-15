import Aos from 'aos';
import { useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// ============ <> =============
import Button from '../components/Button';
import Container from '../components/Container';
import { useBlog } from '../context/BlogContext';
import Features from '../components/Home/Features';
import LoadingSpinner from '../components/LoadingSpinner';
import HomeLatestPosts from '../components/Home/HomeLatestPosts';

// Images
import bgImg from '../assets/images/home/bg-home.jpg';

const Home = () => {
    const { scrollToNextSection } = useBlog();
    const { loading } = useBlog();

    useEffect(() => {
        Aos.init({
            duration: 1000,
            offset: 120, // Khoảng cách trước khi hiệu ứng bắt đầu
            easing: 'ease-in-out',
        });
    });

    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="dark:bg-black">
                    <Helmet>
                        <title>Trang chủ | Website Blog</title>
                        <meta
                            name="description"
                            content="Trang chủ của website Blog"
                        />
                    </Helmet>
                    {/* Hero */}
                    <div
                        className="md:h-screen bg-cover bg-center relative"
                        style={{
                            backgroundImage: `url(${bgImg})`,
                            backgroundSize: 'cover', // Đảm bảo ảnh phủ toàn bộ chiều cao phần tử
                            backgroundPosition: 'center 30%', // Căn giữa ảnh
                            backgroundRepeat: 'no-repeat', // Không lặp lại ảnh
                        }}
                    >
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <Container>
                            <section className="relative flex items-center justify-center h-screen">
                                <div className="flex flex-col">
                                    <div
                                        data-aos="fade-down"
                                        className="flex items-center gap-5"
                                    >
                                        <span className="h-[2px] w-10 md:w-16 bg-yellow-300 flex font-bold"></span>
                                        <p className="uppercase text-yellow-300 text-lg md:text-xl">
                                            you are not alone
                                        </p>
                                    </div>
                                    <h1
                                        data-aos="fade-up"
                                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-black dark:text-white w-[80vw] md:w-[50vw] leading-tight tracking-normal my-3 md:my-6"
                                    >
                                        Explore The World. It's A Big Place
                                    </h1>

                                    <Button
                                        onClick={() =>
                                            scrollToNextSection(
                                                'lastsPost-section',
                                            )
                                        }
                                        variant="outline"
                                        className="text-white hover:text-yellow-300 w-fit inline-flex items-center gap-1 animate-bounce"
                                    >
                                        Scroll down
                                        <ArrowDown size="18" />
                                    </Button>
                                </div>

                                {/* Slider Soon... */}
                            </section>
                        </Container>
                    </div>

                    {/* Latest Post */}
                    <HomeLatestPosts />

                    {/* Features */}
                    <Features />
                </div>
            )}
        </div>
    );
};

export default Home;
