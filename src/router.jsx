import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import SignIn from './pages/SignIn.jsx';
import MyFiles from './pages/MyFiles.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'services',
                element: <Services />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'contact',
                element: <Contact />,
            },
            {
                path: 'create-account',
                element: <CreateAccount />,
            },
            {
                path: 'sign-in',
                element: <SignIn />,
            },
            {
                path: 'my-files',
                element: <MyFiles />,
            },
        ],
    },
]);

export default router;