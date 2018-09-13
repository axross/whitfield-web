import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./NoteCreationConfirmationCard'),
  loading: () => null,
});
