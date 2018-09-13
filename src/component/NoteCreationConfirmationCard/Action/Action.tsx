import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { createElement } from 'react';
import { Subscribe as SubscribeState } from 'unstated';
import styled from '../../../core/styled-components';
import NoteCreation from '../../../state/NoteCreation';

type Props = { className?: string };

const Action = ({ className }: Props) => (
  <SubscribeState to={[NoteCreation]}>
    {(noteCreation: NoteCreation) => (
      <Root className={className}>
        <Button intent={Intent.NONE} onClick={() => noteCreation.clear()}>
          Clear
        </Button>

        <Button
          intent={Intent.SUCCESS}
          icon={IconNames.AIRPLANE}
          disabled={!noteCreation.isReady}
          onClick={() => noteCreation.createNote()}
        >
          Create
        </Button>
      </Root>
    )}
  </SubscribeState>
);

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  & > * {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Action;
