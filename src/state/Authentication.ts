import * as firebase from 'firebase/app';
import { Container } from 'unstated';
import Authenticator from '../service/Authenticator';

type AuthenticationState = {
  user: firebase.User | null;
};

class Authentication extends Container<AuthenticationState> {
  private readonly authenticator: Authenticator;
  public readonly state = { user: null };

  public get isSignedIn() {
    return this.state.user !== null;
  }

  public async signInViaGoogle() {
    await this.authenticator.authenticateViaGoogle();
  }

  public async signOut() {
    await this.authenticator.deauthenticate();
  }

  public constructor({ authenticator }: { authenticator: Authenticator }) {
    super();

    this.authenticator = authenticator;

    this.authenticator.subscribeAuthenticationStateChange(user => this.setState({ user }));
  }
}

export default Authentication;
