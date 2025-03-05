import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type DefaultLayoutTypes = {
    children: ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutTypes) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default DefaultLayout;
