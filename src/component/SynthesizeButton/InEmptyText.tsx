import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { createElement } from 'react';

type Props = {
  className?: string;
};

const InEmptyText = ({ className }: Props) => (
  <Button icon={IconNames.ISSUE} disabled className={className}>
    {'Write something in the above'}
  </Button>
);

export default InEmptyText;
