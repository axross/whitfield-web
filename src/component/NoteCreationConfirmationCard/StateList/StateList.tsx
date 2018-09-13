import { createElement } from 'react';
import { Subscribe as SubscribeState } from 'unstated';
import styled from '../../../core/styled-components';
import NoteCreation from '../../../state/NoteCreation';
import Item, { State } from './Item';

type Props = {
  className?: string;
};

const StateList = ({ className }: Props) => (
  <SubscribeState to={[NoteCreation]}>
    {(noteCreation: NoteCreation) => (
      <Root className={className}>
        <Item label="Phrase" state={noteCreation.isPhraseValid ? State.SUCCESS : State.ERROR} />

        <Item
          label="Phrase Voice"
          state={
            noteCreation.isPhraseVoiceLoading
              ? State.LOADING
              : noteCreation.isPhraseVoiceValid
                ? State.SUCCESS
                : State.ERROR
          }
        />

        <Item
          label="Image"
          state={noteCreation.isImageLoading ? State.LOADING : noteCreation.isImageValid ? State.SUCCESS : State.ERROR}
        />
      </Root>
    )}
  </SubscribeState>
);

const Root = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default StateList;
