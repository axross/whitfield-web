import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./PhraseInputField'),
  loading: () => null,
});
