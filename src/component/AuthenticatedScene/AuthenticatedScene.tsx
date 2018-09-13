import { createElement } from 'react';
import { Route } from 'react-router-dom';
import styled from '../../core/styled-components';
import _NavigationBar from '../NavigationBar';
import RegisterScene from '../RegisterScene';
import SettingsScene from '../SettingsScene';

type Props = {
  className?: string;
};

const AuthenticatedScene = ({ className }: Props) => (
  <Root className={className}>
    <NavigationBar />

    <SceneContents>
      <Route exact path="/" component={RegisterScene} />

      <Route exact path="/settings" component={SettingsScene} />
    </SceneContents>
  </Root>
);

const Root = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas: 'navigation-bar' 'scene-contents';
  width: 100wh;
  height: 100vh;
`;

const NavigationBar = styled(_NavigationBar)`
  grid-area: navigation-bar;
`;

const SceneContents = styled.div`
  grid-area: scene-contents;
  overflow: scroll;
`;

export default AuthenticatedScene;
