import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./ImageSelector'),
  loading: () => null,
});
