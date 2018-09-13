import { Container } from 'unstated';
import * as uuidV4 from 'uuid/v4';
import File from '../core/File';
import AnkiConnect from '../service/AnkiConnect';
import WebResourceResolver from '../service/WebResourceResolver';

type NoteCreationState = {
  sessionId: string;
  phrase: string;
  phraseVoiceUrl: URL | null;
  phraseVoice: File | null;
  phraseVoiceLoadingCount: number;
  imageUrl: URL | null;
  image: File | null;
  imageLoadingCount: number;
};

class NoteCreation extends Container<NoteCreationState> {
  private readonly ankiConnect: AnkiConnect;
  private readonly webResourceResolver: WebResourceResolver;
  public readonly state: NoteCreationState;

  public get isReady(): boolean {
    return this.isPhraseValid && this.isPhraseVoiceValid && this.isImageValid;
  }

  public get isPhraseValid(): boolean {
    return this.state.phrase.trim().length > 0;
  }

  public get isPhraseVoiceValid(): boolean {
    return this.state.phraseVoice !== null;
  }

  public get isPhraseVoiceLoading(): boolean {
    return this.state.phraseVoiceLoadingCount > 0;
  }

  public get isImageValid(): boolean {
    return this.state.image !== null;
  }

  public get isImageLoading(): boolean {
    return this.state.imageLoadingCount > 0;
  }

  public setPhrase(phrase: string) {
    this.setState({ phrase });
  }

  public flagSynthesizationLoading() {
    this.setState({
      phraseVoiceLoadingCount: this.state.phraseVoiceLoadingCount + 1,
    });
  }

  public async setPhraseVoiceUrl(url: URL) {
    this.setState({
      phraseVoiceUrl: url,
      phraseVoice: null,
    });

    const file = await this.webResourceResolver.resolveContents(url);

    this.setState({ phraseVoice: file, phraseVoiceLoadingCount: this.state.phraseVoiceLoadingCount - 1 });
  }

  public async setImageUrl(url: URL) {
    this.setState({ imageUrl: url, image: null, imageLoadingCount: this.state.imageLoadingCount + 1 });

    const file = await this.webResourceResolver.resolveContents(url);

    this.setState({ image: file, imageLoadingCount: this.state.imageLoadingCount - 1 });
  }

  public async createNote() {
    if (!this.isReady) {
      throw new Error();
    }

    await this.ankiConnect.createNote({
      phrase: this.state.phrase,
      phraseVoice: this.state.phraseVoice!,
      image: this.state.image!,
    });

    this.clear();
  }

  public async clear() {
    this.setState({
      sessionId: uuidV4(),
      phrase: '',
      phraseVoiceUrl: null,
      phraseVoice: null,
      imageUrl: null,
      image: null,
    });
  }

  public constructor({
    ankiConnect,
    webResourceResolver,
  }: {
    ankiConnect: AnkiConnect;
    webResourceResolver: WebResourceResolver;
  }) {
    super();

    this.ankiConnect = ankiConnect;
    this.webResourceResolver = webResourceResolver;

    this.state = {
      sessionId: uuidV4(),
      phrase: '',
      phraseVoiceUrl: null,
      phraseVoice: null,
      phraseVoiceLoadingCount: 0,
      imageUrl: null,
      image: null,
      imageLoadingCount: 0,
    };
  }
}

export default NoteCreation;
