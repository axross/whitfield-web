import { FormGroup } from '@blueprintjs/core';
import { createElement } from 'react';
import { Subscribe as SubscribeState } from 'unstated';
import NoteCreation from '../../state/NoteCreation';
import SynthesizeButton from '../SynthesizeButton';

type Props = {
  className?: string;
};

const PhraseVoiceField = ({ className }: Props) => (
  <SubscribeState to={[NoteCreation]}>
    {(noteCreation: NoteCreation) => (
      <FormGroup label="Voice" labelFor="example-sentence-speech-field" className={className}>
        <SynthesizeButton
          text={noteCreation.state.phrase}
          onSynthesizationStart={() => noteCreation.flagSynthesizationLoading()}
          onSynthesizationComplete={dataUrl => noteCreation.setPhraseVoiceUrl(dataUrl)}
        />
      </FormGroup>
    )}
  </SubscribeState>
);

export default PhraseVoiceField;
