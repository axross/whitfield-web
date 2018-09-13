import { toByteArray } from 'base64-js';
import ky from 'ky';
import * as uuidV5 from 'uuid/v5';
import File from '../core/File';

class WebResourceResolver {
  public async resolveContents(url: URL): Promise<File> {
    if (url.protocol === 'data:') return this.resolveContentsFromDataUrl(url);
    if (url.protocol === 'https:' || url.protocol === 'http:') return await this.fetchContentsFromUrl(url);

    throw new UnsupportedProtocolError();
  }

  private resolveContentsFromDataUrl(url: URL): File {
    try {
      const name = uuidV5(url.href, uuidV5.URL);
      const urlBody = url.href.slice(5);
      const commaIndex = urlBody.indexOf(',');
      const isDataEncoded = urlBody.slice(0, commaIndex).endsWith(';base64');
      const mimeType = urlBody.slice(0, isDataEncoded ? commaIndex - 7 : commaIndex);
      const data = urlBody.slice(commaIndex + 1);
      const decodedData = isDataEncoded ? toByteArray(data).buffer : stringToArrayBuffer(data);

      return new File({ name, data: decodedData, mimeType });
    } catch (err) {
      throw new DataUrlParseFailed(url);
    }
  }

  private async fetchContentsFromUrl(url: URL): Promise<File> {
    try {
      const response = await ky.get(url, { throwHttpErrors: false });
      const name = uuidV5(url.href, uuidV5.URL);
      const mimeType = response.headers.get('content-type') || 'application/octet-stream';
      const data = await response.arrayBuffer();

      return new File({ name, data, mimeType });
    } catch (err) {
      throw new FetchFailed(url);
    }
  }
}

export abstract class WebResourceResolvingFailed extends Error {
  public abstract readonly name: string;

  constructor(message: string) {
    super();

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    this.message = message;
  }
}

export class UnsupportedProtocolError extends WebResourceResolvingFailed {
  public readonly name = 'UnsupportedProtocolError';

  constructor() {
    super('The given url is not supported protocol.');
  }
}

export class DataUrlParseFailed extends WebResourceResolvingFailed {
  public readonly name = 'DataUrlParseFailed';

  constructor(url: URL) {
    super(`It's failed to parse the Data URL (${url.href})`);
  }
}

export class FetchFailed extends WebResourceResolvingFailed {
  public readonly name = 'FetchFailed';

  constructor(url: URL) {
    super(`It\'s failed to fetch contents by the URL (${url.href})`);
  }
}

const stringToArrayBuffer = (str: string) => {
  var buffer = new ArrayBuffer(str.length * 2);
  var u16arr = new Uint16Array(buffer);

  for (var i = 0, strLen = str.length; i < strLen; i++) {
    u16arr[i] = str.charCodeAt(i);
  }

  return buffer;
};

export default WebResourceResolver;
