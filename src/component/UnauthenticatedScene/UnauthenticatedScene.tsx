import { Button, Intent, Text } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { createElement } from 'react';
import { Subscribe as SubscribeState } from 'unstated';
import styled from '../../core/styled-components';
import Authentication from '../../state/Authentication';
import _Logo from '../Logo';

type Props = {
  className?: string;
};

const UnauthenticatedScene = ({ className }: Props) => (
  <SubscribeState to={[Authentication]}>
    {(authentication: Authentication) => (
      <Root className={className}>
        <Foreground>
          <Logo />

          <Nanka>Improve your study improvement.</Nanka>

          <Button icon={IconNames.LOG_IN} intent={Intent.PRIMARY} onClick={() => authentication.signInViaGoogle()}>
            Sign in
          </Button>
        </Foreground>

        <BackgroundVideo src="/video.mp4" autoPlay muted loop />
      </Root>
    )}
  </SubscribeState>
);

const Root = styled.div`
  width: 100wh;
  height: 100vh;
`;

const Foreground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFUlEQVQYV2Pkz1p85uO0WBNGBigAADXNBAMSzXXSAAAAAElFTkSuQmCC)
    repeat;
  z-index: 1;
`;

const Logo = styled(_Logo)`
  width: 128px;
  fill: #fff;
  margin-bottom: 16px;
`;

const Nanka = styled(Text)`
  color: #fff;
  margin-bottom: 32px;
`;

const BackgroundVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default UnauthenticatedScene;
