import React, { Component } from 'react';
import { View, Modal, StatusBar, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  Button,
  Text,
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
  Input,
  Label,
  Toast,
  H1,
  H2
} from 'native-base';
import styled from 'styled-components/native';
import Spinner from 'react-native-loading-spinner-overlay';

import ScreenComponent from '../ScreenComponent'

import CafeMenuImage from './CafeMenuImage';

import { cafeMenus } from '../../../data/data';

export default class OrderScreen extends Component {
  constructor (props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleOrder = () => {
    const { navigation } = this.props;
    this.setState({
      isFetching: true
    });

    setTimeout(() => {
      navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'CafeMenuList'})
          ]
        })
      );

      Toast.show({
        text: '주문이 완료되었습니다.',
        buttonText: '닫기',
        duration: 1000 * 3,
        type: 'success'        
      });
      
      this.setState({
        isFetching: false
      });
    }, 1000)
  }
  render () {
    const { isFetching } = this.state;
    const { navigation } = this.props;
    const { selectedMenuIds } = this.props.navigation.state.params;

    const selectedMenus = selectedMenuIds.map((menuId) => cafeMenus.find((cafeMenu) => cafeMenu.id === menuId));
    
    return (
      <ScreenComponent title="Order" navigation={navigation} hasBackButton>
        <Spinner visible={isFetching} />        
        <Content>
          {selectedMenus.map((menu, i) => {
            return (
              <Card key={i}>
                <CardItem style={{flex: 1, justifyContent: 'center'}}>
                  <H1>{menu.name}</H1>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <CafeMenuImage source={{ uri: menu.image }} />
                  </Body>
                </CardItem>                
                <CardItem>
                  <Right style={{flex: 1}}>            
                    <H2>{`${menu.price}원`}</H2>            
                  </Right>
                </CardItem>
                <CardItem>
                  <Form style={{flex: 1}}>
                    <Item floatingLabel>
                      <Label>주문시 요청사항</Label>
                      <Input />
                    </Item>
                  </Form>
                </CardItem>
              </Card>
            )
          })}
          <Button iconLeft block onPress={this.handleOrder}>
            <Icon name="cafe" />
            <Text>주문하기</Text>
          </Button>
        </Content>
      </ScreenComponent>
    );
  }
}