import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Logo'),
  loading: () => null,
});
