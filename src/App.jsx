import { Suspense } from 'react';
import './App.css';
import Loading from './components/loading/Loading';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/PublicRoutes/PublicRoutes';

function App() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <RouterProvider router={router}></RouterProvider>
            </Suspense>
        </>
    );
}

export default App;
