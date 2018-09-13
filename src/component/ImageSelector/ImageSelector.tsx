import { createElement } from 'react';
import { Value } from 'react-powerplug';
import styled from '../../core/styled-components';
import Item from './Item';

type Props = {
  imageSrcs: URL[];
  onChange?: (src: URL) => void;
  className?: string;
};

const ImageSelector = ({ imageSrcs, onChange, className }: Props) => (
  <Value initial={imageSrcs[0]} onChange={onChange}>
    {({ value: selectedSrc, set: select }) => (
      <Root className={className}>
        <Inner>
          {imageSrcs.map(src => (
            <Item src={src} selected={src === selectedSrc} onClick={() => select(src)} key={src.href} />
          ))}
        </Inner>
      </Root>
    )}
  </Value>
);

const Root = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -4px;
  margin-bottom: -4px;
  & > * {
    margin-right: 4px;
    margin-bottom: 4px;
  }
`;

export default ImageSelector;
