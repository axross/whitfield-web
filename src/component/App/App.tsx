import { firestore } from 'firebase';
import { History } from 'history';
import { createElement, Fragment } from 'react';
import { Router } from 'react-router-dom';
import { Provider as StateProvider, Subscribe as SubscribeState } from 'unstated';
import AnkiConnect from '../../service/AnkiConnect';
import Authenticator from '../../service/Authenticator';
import ImageSearchCaller from '../../service/ImageSearchCaller';
import SynthesizeCaller from '../../service/SynthesizeCaller';
import WebResourceResolver from '../../service/WebResourceResolver';
import Authentication from '../../state/Authentication';
import ImageSearch from '../../state/ImageSearch';
import NoteCreation from '../../state/NoteCreation';
import FirestoreContext from '../FirestoreContext';
import HistoryContext from '../HistoryContext';
import ImageSearchCallerContext from '../ImageSearchCallerContext';
import SynthesizeCallerContext from '../SynthesizeCallerContext';
import GlobalStyle from '../GlobalStyle';
import AuthenticatedScene from '../AuthenticatedScene';
import UnauthenticatedScene from '../UnauthenticatedScene';

type Props = {
  ankiConnect: AnkiConnect;
  authenticator: Authenticator;
  firestore: firestore.Firestore;
  history: History;
  imageSearchCaller: ImageSearchCaller;
  synthesizeCaller: SynthesizeCaller;
  webResourceResolver: WebResourceResolver;
};

const App = ({
  ankiConnect,
  authenticator,
  firestore,
  history,
  imageSearchCaller,
  synthesizeCaller,
  webResourceResolver,
}: Props) => (
  <Fragment>
    <HistoryContext.Provider value={history}>
      <FirestoreContext.Provider value={firestore}>
        <ImageSearchCallerContext.Provider value={imageSearchCaller}>
          <SynthesizeCallerContext.Provider value={synthesizeCaller}>
            <StateProvider
              inject={[
                new Authentication({ authenticator }),
                new ImageSearch(),
                new NoteCreation({ ankiConnect, webResourceResolver }),
              ]}
            >
              <SubscribeState to={[Authentication]}>
                {(authentication: Authentication) =>
                  authentication.isSignedIn ? (
                    <Router history={history}>
                      <AuthenticatedScene />
                    </Router>
                  ) : (
                    <UnauthenticatedScene />
                  )
                }
              </SubscribeState>
            </StateProvider>
          </SynthesizeCallerContext.Provider>
        </ImageSearchCallerContext.Provider>
      </FirestoreContext.Provider>
    </HistoryContext.Provider>

    <GlobalStyle />
  </Fragment>
);

export default App;
