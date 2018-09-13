import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Do'),
  loading: () => null,
});
