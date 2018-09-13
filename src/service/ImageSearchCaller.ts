import * as firebase from 'firebase/app';

class ImageSearchCaller {
  private readonly firebaseApp: firebase.app.App;

  public async searchImages(text: string): Promise<URL[]> {
    try {
      const result = await this.firebaseApp.functions().httpsCallable('searchPictures')({ text });

      return (result.data as string[]).map(str => new URL(str));
    } catch (err) {
      if (err.code === 'invalid-argument') {
        throw new ImageSearchFailedByInvalidArguments(err.message);
      }

      throw new ImageSearchFailed(err.message);
    }
  }

  public constructor({ firebaseApp }: { firebaseApp: firebase.app.App }) {
    this.firebaseApp = firebaseApp;
  }
}

export class ImageSearchFailed extends Error {
  public readonly name = 'ImageSearchFailed';

  constructor(message: string) {
    super();

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    this.message = message;
  }
}

export class ImageSearchFailedByInvalidArguments extends Error {
  public readonly name = 'ImageSearchFailedByInvalidArguments';

  constructor(message: string) {
    super();

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    this.message = message;
  }
}

export default ImageSearchCaller;
