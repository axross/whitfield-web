import { createElement } from 'react';
import styled from '../../core/styled-components';

type Props = {
  className?: string;
};

const SettingsScene = ({ className }: Props) => <Root className={className}>aaaa</Root>;

const Root = styled.div`
  padding: 64px calc((100vw - 960px) / 2);
`;

export default SettingsScene;
