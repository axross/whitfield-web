import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { createElement } from 'react';

type Props = {
  className?: string;
};

const InLoading = ({ className }: Props) => (
  <Button icon={IconNames.PLAY} loading className={className}>
    {'Loading'}
  </Button>
);

export default InLoading;
