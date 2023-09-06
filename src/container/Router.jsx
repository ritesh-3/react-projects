import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import { projects } from '../data';
import Container from './Container';

const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={"Loading..."}>
            <Component {...props} />
        </Suspense>
    );
};

const Routes = projects.map((project) => {
    const appPath = "../apps/" + project.path
    const LoadableComponent = Loadable(lazy(() => import(  /* @vite-ignore */ appPath)))
    return {
        path: project.path,
        element: <LoadableComponent />
    }
})

Routes.push({
    path: "*",
    element: <Container />
})


const Router = () => {
    return useRoutes(Routes)
}

export default Router
