import { createElement, ReactNode } from 'react';
import styled from '../../core/styled-components';

type Props = {
  className?: string;
  children?: ReactNode;
};

const FieldList = ({ className, children }: Props) => <Root className={className}>{children}</Root>;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-items: flex-start;
  & > * {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default FieldList;
