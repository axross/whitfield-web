import { FormGroup, InputGroup } from '@blueprintjs/core';
import { ChangeEvent, createElement } from 'react';
import { Subscribe as SubscribeState } from 'unstated';
import NoteCreation from '../../state/NoteCreation';

type Props = {
  className?: string;
};

const PhraseInputField = ({ className }: Props) => (
  <SubscribeState to={[NoteCreation]}>
    {(noteCreation: NoteCreation) => (
      <FormGroup
        helperText="Input the phrase you want to learn in the above."
        label="Phrase"
        labelFor="example-sentence-field"
        labelInfo="(required)"
        className={className}
      >
        <InputGroup
          id="example-sentence-field"
          placeholder="come up with"
          defaultValue={noteCreation.state.phrase}
          onChange={(e: ChangeEvent<HTMLInputElement>) => noteCreation.setPhrase(e.currentTarget.value)}
          key={noteCreation.state.sessionId}
        />
      </FormGroup>
    )}
  </SubscribeState>
);

export default PhraseInputField;
