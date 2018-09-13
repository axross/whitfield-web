import { Icon as _Icon, Intent, Spinner as _Spinner, Text } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { createElement } from 'react';
import styled from '../../../core/styled-components';

type Props = {
  label: string;
  state: State;
  className?: string;
};

export enum State {
  LOADING,
  SUCCESS,
  ERROR,
}

const Item = ({ label, state, className }: Props) => (
  <Root className={className}>
    {state === State.LOADING ? (
      <Spinner size={16} />
    ) : (
      <Icon
        icon={state === State.SUCCESS ? IconNames.TICK_CIRCLE : IconNames.ERROR}
        intent={state === State.SUCCESS ? Intent.SUCCESS : Intent.DANGER}
        iconSize={16}
      />
    )}

    <Label>{label}</Label>
  </Root>
);

const Root = styled.li`
  display: grid;
  grid-template-columns: 16px 8px auto;
  grid-template-areas: 'icon . label';
  align-items: center;
  height: 16px;
`;

const Spinner = styled(_Spinner)`
  grid-area: icon;
`;

const Icon = styled(_Icon)`
  grid-area: icon;
`;

const Label = styled(Text)`
  grid-area: label;
`;

export default Item;
