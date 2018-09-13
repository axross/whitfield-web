import * as firebase from 'firebase';

class Authenticator {
  private readonly firebaseAuth: firebase.auth.Auth;

  public async authenticateViaGoogle(): Promise<firebase.User> {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await this.firebaseAuth.signInWithPopup(provider);

      return result.user!;
    } catch (err) {
      throw new AuthenticationFailed('Failed.');
    }
  }

  public async deauthenticate(): Promise<void> {
    await this.firebaseAuth.signOut();
  }

  public subscribeAuthenticationStateChange(listener: (user: firebase.User | null) => void) {
    this.firebaseAuth.onAuthStateChanged(listener);
  }

  public constructor({ firebaseAuth }: { firebaseAuth: firebase.auth.Auth }) {
    this.firebaseAuth = firebaseAuth;
  }
}

export class AuthenticationFailed extends Error {
  public readonly name = 'AuthenticationFailed';

  constructor(message: string) {
    super();

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    this.message = message;
  }
}

export default Authenticator;
