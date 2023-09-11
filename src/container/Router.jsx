import { Suspense, lazy, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { projects } from '../data';
import Container from './Container';
import BoxLoader from './BoxLoader';
import ErrorPage from './ErrorPage';

const Loadable = (Component) => (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(delay);
    }, []);

    if (loading) {
        return <BoxLoader />;
    }
    return (
        <Suspense fallback={<BoxLoader />}>
            <Component {...props} />
        </Suspense>
    );
};

const Routes = projects.map((project) => {
    const appPath = "/src/apps/" + project.path
    const LoadableComponent = Loadable(lazy(() => import(  /* @vite-ignore */ appPath)))
    return {
        path: project.path,
        element: <LoadableComponent />
    }
})

Routes.push({
    path: "/",
    element: <Container />
})

Routes.push({
    path: "*",
    element: <ErrorPage />
})


const Router = () => {
    return useRoutes(Routes)
}

export default Router
