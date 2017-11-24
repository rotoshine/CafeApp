import React, { Component } from 'react';
import { AppREgistry, Image, StatusBar } from 'react-native';
import {
  Button,
  Text,
  Container,
  Left,
  Body,
  List,
  ListItem,
  Content,
  Icon
} from 'native-base';
import styled from 'styled-components/native';

const CafeImage = styled.Image`  
  width: 100%;
  height: 150px;
  resize-mode: contain;
`;

const routes = [
  {
    name: 'Home',
    navigate: 'Home',
    icon: 'home'
  }, 
  {
    name: 'Cafe Menu',
    navigate: 'CafeMenuList',
    icon: 'cafe'
  },
  {
    name: 'Profile',
    navigate: 'Profile',
    icon: 'person'
  }
];

export default class SideBar extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={{paddingTop: StatusBar.currentHeight}}>
        <Content>
          <CafeImage source={require('../images/pinkfong-logo.png')} />
          <List dataArray={routes}
            renderRow={(menu) => {
              return (
                <ListItem icon button onPress={() => navigation.navigate(menu.navigate)}>
                  <Left>
                    <Icon name={menu.icon} />
                  </Left>
                  <Body>
                    <Text>{menu.name}</Text>
                  </Body>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    )
  }
}