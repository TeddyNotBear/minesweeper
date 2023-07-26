import { RouteObject } from 'react-router-dom';
import GridView from './views/GridView';
import MenuView from './views/MenuView';


const routes: RouteObject[] = [
  // {
  //   path: '/404',
  //   element: <NotFoundView />,
  // },
  {
    path: '/',
    element: <MenuView />,
  },{
    path: 'play/:grid_id', // This is a relative path to the parent's path ('/'), not an absolute path.
    element: <GridView />,
  },

];

export default routes;