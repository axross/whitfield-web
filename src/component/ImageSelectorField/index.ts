import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./ImageSelectorField'),
  loading: () => null,
});
