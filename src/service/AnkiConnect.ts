import { fromByteArray } from 'base64-js';
import ky from 'ky';
import * as uuidV4 from 'uuid/v4';
import File from '../core/File';

class AnkiConnect {
  public async ping(): Promise<boolean> {
    try {
      const response = await ky.post('http://localhost:8765', {
        body: JSON.stringify({
          version: 6,
          action: 'version',
        }),
      });

      const json = await response.json();

      return json.result === 6;
    } catch (err) {
      return false;
    }
  }

  public async createNote({
    phrase,
    phraseVoice,
    image,
  }: {
    phrase: string;
    phraseVoice: File;
    image: File;
  }): Promise<void> {
    const id = `${phrase}-${uuidV4()}`;

    await Promise.all([
      ky.post('http://localhost:8765', {
        body: JSON.stringify({
          version: 6,
          action: 'storeMediaFile',
          params: {
            filename: phraseVoice.filename,
            data: fromByteArray(new Uint8Array(phraseVoice.data)),
          },
        }),
      }),
      ky.post('http://localhost:8765', {
        body: JSON.stringify({
          version: 6,
          action: 'storeMediaFile',
          params: {
            filename: image.filename,
            data: fromByteArray(new Uint8Array(image.data)),
          },
        }),
      }),
      ky.post('http://localhost:8765', {
        body: JSON.stringify({
          version: 6,
          action: 'addNote',
          params: {
            note: {
              deckName: 'Whitfield',
              modelName: 'Whitfield',
              fields: {
                ID: id,
                Phrase: phrase,
                'Phrase Voice': `[sound:${phraseVoice.filename}]`,
                Image: `<img src="${image.filename}">`,
              },
              tags: ['whitfield'],
            },
          },
        }),
      }),
    ]);
  }
}

export default AnkiConnect;
