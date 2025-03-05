import { Link } from 'react-router-dom';
import { footerData } from '../data/footerData';
import Container from '../components/Container';

const Footer = () => {
    return (
        <footer className="bg-gray-300 dark:bg-black py-10 dark:border-t dark:border-secondary-border">
            <Container>
                <ul className="flex flex-wrap md:justify-between md:gap-5 gap-10">
                    <li className="w-[300px]">
                        <div className="font-bold text-white flex items-center gap-2">
                            <img
                                src={footerData.logo}
                                alt=""
                                className="h-9 rounded-lg"
                            />
                            <span className="font-thin italic text-black dark:text-white">
                                TravelBlog
                            </span>
                        </div>
                        <p className="mt-3 text-secondary-text">
                            {footerData.description}
                        </p>
                    </li>
                    {footerData.sections.map((footer, index) => (
                        <li key={index}>
                            <h3 className="text-lg font-semibold dark:text-gray-100">
                                {footer.title}
                            </h3>
                            <ul className="flex flex-col gap-1 mt-3">
                                {footer.links.map((link, index) => (
                                    <li
                                        key={index}
                                        className="text-secondary-text cursor-pointer hover:text-black dark:hover:text-primary-hover"
                                    >
                                        <Link to={link.url}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <p className="flex justify-center border-t border-t-gray-400 mt-8 pt-5 dark:text-white">
                    {footerData.copyright}
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
