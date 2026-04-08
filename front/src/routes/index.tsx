import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../pages/LandingPage';
import ProductPage from '../pages/ProductPage';
import ProductFormPage from '../pages/ProductFormPage';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: 'start', element: <LandingPage /> },
            { path: 'products', element: <ProductPage /> },
            { path: 'products/new', element: <ProductFormPage />},
            { path: 'products/:id/edit', element: <ProductFormPage />}
        ]
    },
    /*
    {

        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
        ]
    },//*/
]);

export default router;