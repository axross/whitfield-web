import { Container } from 'unstated';

type ImageSearchState = {
  query: string;
};

class ImageSearch extends Container<ImageSearchState> {
  public readonly state = { query: '' };

  public setQuery(query: string) {
    this.setState({ query });
  }
}

export default ImageSearch;
