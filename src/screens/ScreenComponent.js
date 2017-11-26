import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';
import {
  Button,
  Text,
  Container,
  Body,
  Header,
  Title,
  Icon,
  Left,
  Right
} from 'native-base';

import MenuTrigger from './sidebar/MenuTrigger';

export default class ScreenComponent extends Component {
  render() {
    const { title, navigation, headerLeft, headerRight, hasBackButton, children } = this.props;

    return (
      <Container style={{ paddingTop: StatusBar.currentHeight }}>
        <Header>
          <Left style={{ flex: 1 }}>
            {
              hasBackButton ?
                <Button iconLeft
                  transparent
                  onPress={() => navigation.dispatch(NavigationActions.back())}>
                  <Icon name="arrow-round-back" />
                </Button> :
                <MenuTrigger navigation={navigation} />
            }
          </Left>

          <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Title>{title}</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            {headerRight}
          </Right>
        </Header>
        {children}
      </Container>
    );
  }
}