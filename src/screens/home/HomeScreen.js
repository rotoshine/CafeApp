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
  H1
} from 'native-base';
import styled from 'styled-components/native';

import ScreenComponent from '../ScreenComponent'
import MenuTrigger from '../../sidebar/MenuTrigger';

const MainView = styled.View`  
  width: 100%;
  height: 100%;
  justify-content: center;  
  flex: 1;
`;
const CafeMainImage = styled.Image`  
  resize-mode: cover;  
  width: 100%;
  height: 100%;  
  justify-content: center;
  align-items: center;
`;
export default class HomeScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <ScreenComponent title="SmartStudy Cafe" navigation={navigation}>        
      <MainView>
        <CafeMainImage source={require('../../images/cafe.jpg')}>
          <Content>
            
          </Content>
        </CafeMainImage>
        </MainView>
      </ScreenComponent>
    );
  }
}