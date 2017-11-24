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
  Right
} from 'native-base';
import styled from 'styled-components/native';

import ScreenComponent from '../ScreenComponent'

export default class ProfileScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <ScreenComponent title="Profile" navigation={navigation}>
        <Content>
          <Text>사용자 쿠폰 정보 보여주자</Text>
        </Content>
      </ScreenComponent>
    );
  }
}