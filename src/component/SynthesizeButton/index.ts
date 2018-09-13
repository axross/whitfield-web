import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./SynthesizeButton'),
  loading: () => null,
});
