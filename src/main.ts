import 'firebase/functions';

const config: Record<string, string> = (window as any).__config__;

window.addEventListener('DOMContentLoaded', async () => {
  const [
    [{ FocusStyleManager }, firebase, { default: createBrowserHistory }, { createElement }, { render }],
    [
      { default: AnkiConnect },
      { default: Authenticator },
      { default: ImageSearchCaller },
      { default: SynthesizeCaller },
      { default: WebResourceResolver },
      { default: App },
    ],
  ] = await Promise.all([
    Promise.all([
      import('@blueprintjs/core'),
      import('firebase/app'),
      import('history/createBrowserHistory'),
      import('react'),
      import('react-dom'),
    ]),
    Promise.all([
      import('./service/AnkiConnect'),
      import('./service/Authenticator'),
      import('./service/ImageSearchCaller'),
      import('./service/SynthesizeCaller'),
      import('./service/WebResourceResolver'),
      import('./component/App/App'),
    ]),
  ]);

  FocusStyleManager.onlyShowFocusOnTabs();

  const firebaseApp = firebase.initializeApp({
    projectId: config.FIREBASE_PROJECT_ID,
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
  });

  const history = createBrowserHistory();
  const firestore = firebaseApp.firestore();
  const firebaseAuth = firebaseApp.auth();

  const ankiConnect = new AnkiConnect();
  const authenticator = new Authenticator({ firebaseAuth });
  const imageSearchCaller = new ImageSearchCaller({ firebaseApp });
  const synthesizeCaller = new SynthesizeCaller({ firebaseApp });
  const webResourceResolver = new WebResourceResolver();

  render(
    createElement(App, {
      ankiConnect,
      authenticator,
      firestore,
      history,
      imageSearchCaller,
      synthesizeCaller,
      webResourceResolver,
    }),
    document.getElementById('app')
  );
});
