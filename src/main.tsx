// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'aos/dist/aos.css';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <App />,
    // </StrictMode>
);
