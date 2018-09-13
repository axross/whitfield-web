import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./App'),
  loading: () => null,
});
