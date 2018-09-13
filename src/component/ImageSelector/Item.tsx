import { createElement, MouseEventHandler } from 'react';
import styled from '../../core/styled-components';

type Props = {
  src: URL;
  selected?: boolean;
  onClick: MouseEventHandler<HTMLImageElement>;
  className?: string;
};

const Item = ({ src, selected, onClick, className }: Props) => (
  <Root src={src.href} selected={!!selected} onClick={onClick} className={className} />
);

const Root = styled.img.attrs<{ selected: boolean }>({})`
  flex: auto;
  height: 128px;
  min-width: 96px;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  transform: ${({ selected }) => (selected ? 'scale(0.9, 0.9)' : 'initial')};
  transition: transform 100ms ease-in-out 0ms, box-shadow 100ms ease-in-out 0ms;
  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  }
`;

export default Item;
