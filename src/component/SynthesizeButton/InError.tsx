import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { createElement } from 'react';

type Props = {
  className?: string;
};

const InError = ({ className }: Props) => (
  <Button icon={IconNames.ERROR} disabled className={className}>
    {'Error'}
  </Button>
);

export default InError;
