import { createElement } from 'react';
import styled from '../../core/styled-components';
import PhraseInputField from '../PhraseInputField';
import PhraseVoiceField from '../PhraseVoiceField';
import ImageSelectorField from '../ImageSelectorField';
import FieldList from '../FieldList';
import _NoteCreationConfirmationCard from '../NoteCreationConfirmationCard';

type Props = {
  className?: string;
};

const RegisterScene = ({ className }: Props) => (
  <Root>
    <LeftPane>
      <FieldList className={className}>
        <PhraseInputField />

        <PhraseVoiceField />

        <ImageSelectorField />
      </FieldList>
    </LeftPane>

    <RightPane>
      <NoteCreationConfirmationCard />
    </RightPane>
  </Root>
);

const Root = styled.div`
  display: grid;
  grid-template-columns: 640px 320px;
  grid-template-areas: 'left right';
  grid-gap: 32px;
  padding: 64px calc((100vw - 640px - 320px - 32px) / 2);
`;

const LeftPane = styled.div`
  grid-area: left;
`;

const RightPane = styled.div`
  grid-area: right;
`;

const NoteCreationConfirmationCard = styled(_NoteCreationConfirmationCard)`
  position: sticky;
  top: 64px;
`;

export default RegisterScene;
