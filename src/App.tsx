import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react/jsx-runtime';
import DefaultLayout from './layouts/DefaultLayout';
import { ThemeProvider } from './context/ThemeProvider';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { ToastContainer } from 'react-toastify/unstyled';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <AuthProvider>
            <BlogProvider>
                <ThemeProvider>
                    <Router>
                        <ToastContainer position="top-right" autoClose={3000} />
                        <ScrollToTop />
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout =
                                    route.layout === null
                                        ? Fragment
                                        : route.layout || DefaultLayout;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </Router>
                </ThemeProvider>
            </BlogProvider>
        </AuthProvider>
    );
};

export default App;
