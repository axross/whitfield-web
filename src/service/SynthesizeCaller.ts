import * as firebase from 'firebase/app';

class SynthesizeCaller {
  private readonly firebaseApp: firebase.app.App;

  public async synthesize(text: string): Promise<URL> {
    try {
      const result = await this.firebaseApp.functions().httpsCallable('synthesize')({ text });

      return new URL(result.data);
    } catch (err) {
      if (err.code === 'invalid-argument') {
        throw new SynthesizationFailedByInvalidArguments(err.message);
      }

      throw new SynthesizationFailed(err.message);
    }
  }

  public constructor({ firebaseApp }: { firebaseApp: firebase.app.App }) {
    this.firebaseApp = firebaseApp;
  }
}

export class SynthesizationFailed extends Error {
  public readonly name = 'SynthesizationFailed';

  constructor(message: string) {
    super();

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    this.message = message;
  }
}

export class SynthesizationFailedByInvalidArguments extends Error {
  public readonly name = 'SynthesizationFailedByInvalidArguments';

  constructor(message: string) {
    super();

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    this.message = message;
  }
}

export default SynthesizeCaller;
