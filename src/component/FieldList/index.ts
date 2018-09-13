import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./FieldList'),
  loading: () => null,
});
