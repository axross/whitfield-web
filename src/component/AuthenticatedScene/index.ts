import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./AuthenticatedScene'),
  loading: () => null,
});
