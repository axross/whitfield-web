import { AnchorButton, IButtonProps } from '@blueprintjs/core';
import { LocationDescriptor, createLocation } from 'history';
import { AnchorHTMLAttributes, createElement, MouseEvent } from 'react';
import HistoryContext from '../HistoryContext';

type Props = IButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: LocationDescriptor;
    replace?: boolean;
  };

const LinkButton = ({ to, replace, onClick, ...props }: Props) => {
  return (
    <HistoryContext.Consumer>
      {history => {
        const location = typeof to === 'string' ? createLocation(to, undefined, undefined, history.location) : to;
        const href = location ? history.createHref(location) : '';
        const onClick = (e: MouseEvent<HTMLElement>) => {
          if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
          if (href.startsWith('http')) return;

          e.preventDefault();

          replace ? history.replace(to as any) : history.push(to as any);
        };

        return <AnchorButton {...props} href={href} onClick={onClick} />;
      }}
    </HistoryContext.Consumer>
  );
};

export default LinkButton;
