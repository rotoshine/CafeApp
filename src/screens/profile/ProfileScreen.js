import React, { Component } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Form, 
  Item, 
  Label,
  Toast
} from 'native-base';
import styled from 'styled-components/native';

import ScreenComponent from '../ScreenComponent'
import UserInfo from './UserInfo';

import { loadUser, logout } from '../../helpers/authHelpers';
import { navigationResetAndMoveScreen } from '../../helpers/navigationHelpers';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }
  async componentWillMount() {
    const { user } = await loadUser();

    if (user !== null) {
      this.setState({ user });
    }
  }

  handleLogout = async () => {
    const { navigation } = this.props;

    if (await logout()) {
      navigationResetAndMoveScreen(navigation, 'Login');     
    } else {
      Toast.show({ title: '로그아웃에 실패했습니다.' });
    }
  }

  render() {
    const { user } = this.state;
    const { navigation } = this.props;

    if (user === null) {
      return null;
    }

    return (
      <ScreenComponent title="Profile" navigation={navigation}>
        <Content>       
          <UserInfo user={user} onLogout={this.handleLogout} />
          <Card>
            <CardItem header>
              <Body><Text>주문내역</Text></Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>주문내역~</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Body>
                <Text>쿠폰</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>쿠폰 목록~~</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Body>
                <Text>스탬프</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>스탬프 꽝꽝~~</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </ScreenComponent>
    );
  }
}