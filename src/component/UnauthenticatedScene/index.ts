import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./UnauthenticatedScene'),
  loading: () => null,
});
