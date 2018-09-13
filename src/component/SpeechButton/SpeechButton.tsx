import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { createElement, Fragment, PureComponent, RefObject, createRef } from 'react';

type Props = {
  src: URL;
  className?: string;
};

type State = {
  isReadyToPlay: boolean;
};

class SpeechButton extends PureComponent<Props, State> {
  private audioRef: RefObject<HTMLAudioElement>;

  public componentDidMount() {
    const el = this.audioRef.current as HTMLAudioElement;

    el.addEventListener('loadeddata', () => {
      this.setState({ isReadyToPlay: true });
    });

    el.addEventListener('emptied', () => {
      this.setState({ isReadyToPlay: false });
    });
  }

  public render() {
    return (
      <Fragment>
        <Button
          icon={IconNames.PLAY}
          onClick={this.onClickButton}
          loading={!this.state.isReadyToPlay}
          className={this.props.className}
        >
          {this.state.isReadyToPlay ? 'Speech' : 'Preparing'}
        </Button>

        <audio src={this.props.src.href} ref={this.audioRef} />
      </Fragment>
    );
  }

  private onClickButton = () => {
    if (this.audioRef.current) {
      this.audioRef.current.currentTime = 0;
      this.audioRef.current.play();
    }
  };

  public constructor(props: Props) {
    super(props);

    this.audioRef = createRef();
    this.state = { isReadyToPlay: false };
  }
}

export default SpeechButton;
