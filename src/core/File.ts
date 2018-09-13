import * as mime from 'mime';

class File {
  public readonly name: string;
  public readonly data: ArrayBuffer;
  public readonly mimeType: string;

  public get filename() {
    return `${this.name}.${mime.getExtension(this.mimeType)}`;
  }

  constructor({ name, data, mimeType }: { name: string; data: ArrayBuffer; mimeType: string }) {
    this.name = name;
    this.data = data;
    this.mimeType = mimeType;
  }
}

export default File;
