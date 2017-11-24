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
  H1
} from 'native-base';
import styled from 'styled-components/native';
import Spinner from 'react-native-loading-spinner-overlay';

import ScreenComponent from '../ScreenComponent'

import CafeMenuImage from './CafeMenuImage';
import NumberFormat from './NumberFormat';

import { cafeMenus } from '../../../data/data';

const OptionView = styled.View`
  display: flex;
  flex-direction: row;
`;

const OptionButton = styled(Button)`
  flex: 1;
`;
export default class OrderScreen extends Component {
  constructor (props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }
  
  componentWillReceiveProps (nextProps) {
    Toast.show({ title: 'prop 받음', duration: 1000, position: 'bottom'});    
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  changeShot(i, shot) {
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
    const totalPrice = selectedMenus.reduce((totalPrice, menu) => totalPrice + menu.price, 0);
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
                    <NumberFormat style={{fontSize: 20}} number={menu.price} />
                  </Right>
                </CardItem>
                <CardItem>
                  <OptionView>
                    <OptionButton active danger><Text>Hot</Text></OptionButton>
                    <OptionButton><Text>Ice</Text></OptionButton>
                  </OptionView>                  
                </CardItem>
                <CardItem>
                  <OptionView>
                    <OptionButton light onPress={() => this.changeShot(i, 1)}><Text>1샷</Text></OptionButton>
                    <OptionButton active info onPress={() => this.changeShot(i, 2)}><Text>2샷</Text></OptionButton>
                    <OptionButton info onPress={() => this.changeShot(i, 3)}><Text>3샷</Text></OptionButton>
                    <OptionButton info onPress={() => this.changeShot(i, 4)}><Text>4샷</Text></OptionButton>
                  </OptionView>
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
          <Card>
            <CardItem>
              <NumberFormat style={{fontSize: 35}} number={totalPrice}/>
            </CardItem>
          </Card>
          <Button iconLeft block onPress={this.handleOrder}>
            <Icon name="cafe" />
            <Text>주문하기</Text>
          </Button>
        </Content>
      </ScreenComponent>
    );
  }
}