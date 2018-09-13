import { Card, Elevation } from '@blueprintjs/core';
import { createElement } from 'react';
import styled from '../../core/styled-components';
import Action from './Action';
import _StateList from './StateList';

type Props = {
  className?: string;
};

const NoteCreationConfirmationCard = ({ className }: Props) => (
  <Card elevation={Elevation.ONE} className={className}>
    <StateList />

    <Action />
  </Card>
);

const StateList = styled(_StateList)`
  margin-bottom: 32px;
`;

export default NoteCreationConfirmationCard;
