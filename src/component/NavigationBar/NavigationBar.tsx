import { Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Alignment } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { createElement } from 'react';
import { Subscribe as SubscribeState } from 'unstated';
import Authentication from '../../state/Authentication';
import LinkButton from '../LinkButton';

type Props = {
  className?: string;
};

const NavigationBar = ({ className }: Props) => (
  <SubscribeState to={[Authentication]}>
    {(authentication: Authentication) => (
      <Navbar className={className}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Whitfield</NavbarHeading>
        </NavbarGroup>

        <NavbarGroup align={Alignment.RIGHT}>
          <LinkButton to="/" minimal>
            New Card
          </LinkButton>

          <NavbarDivider />

          {/* <LinkButton to="/settings" minimal icon={IconNames.COG} /> */}

          <Button minimal icon={IconNames.LOG_OUT} onClick={() => authentication.signOut()} />
        </NavbarGroup>
      </Navbar>
    )}
  </SubscribeState>
);

export default NavigationBar;
