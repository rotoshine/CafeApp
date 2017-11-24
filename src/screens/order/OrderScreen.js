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
import BeverageType from './BeverageType';

const MAX_SHOT_COUNT = 4;

const OptionView = styled.View`
  display: flex;
  flex-direction: row;
`;

const OptionButton = styled(Button) `
  flex: 1;
`;
export default class OrderScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  changeOrderValue(orderIndex, paramName, value) {

    const { navigation } = this.props;
    const { selectedMenuItems } = navigation.state.params;

    const nextSelectedMenuItems = [...selectedMenuItems];

    if (nextSelectedMenuItems[orderIndex] && nextSelectedMenuItems[orderIndex][paramName]) {
      nextSelectedMenuItems[orderIndex][paramName] = value;

      navigation.setParams(nextSelectedMenuItems);
    }
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
            NavigationActions.navigate({ routeName: 'CafeMenuList' })
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

  renderShotCountOptions(orderIndex, menuItem) {
    const shotCountOptions = [];

    for (let shotCountIndex = 0; shotCountIndex < MAX_SHOT_COUNT; shotCountIndex++) {
      const shotCount = (shotCountIndex + 1);
      const selected = (menuItem.shotCount === shotCount);
      shotCountOptions.push(
        <OptionButton key={shotCountIndex}
          info={selected}
          light={!selected}
          onPress={() => this.changeOrderValue(orderIndex, 'shotCount', shotCount)}>
          <Text>{shotCount}샷</Text>
        </OptionButton>
      );
    }

    return shotCountOptions;
  }

  render() {
    const { isFetching } = this.state;
    const { navigation } = this.props;
    const { selectedMenuItems } = this.props.navigation.state.params;

    const cafeMenusMap = {};
    selectedMenuItems.forEach((menuItem) => {
      cafeMenusMap[menuItem.menuId] = cafeMenus.find((cafeMenu) => cafeMenu.id === menuItem.menuId);
    });

    const totalPrice = selectedMenuItems.reduce((totalPrice, menuItem) => totalPrice + cafeMenusMap[menuItem.menuId].price, 0);
    return (
      <ScreenComponent title="Order" navigation={navigation} hasBackButton>
        <Spinner visible={isFetching} />
        <Content padder>
          {selectedMenuItems.map((menuItem, orderIndex) => {
            const menu = cafeMenusMap[menuItem.menuId];

            if (!menu) {
              return null;
            }

            const isHot = menuItem.beverageType === BeverageType.HOT;
            return (
              <Card key={orderIndex}>
                <CardItem style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Body>
                    <H1 style={{flex: 1}}>{menu.name}</H1>
                  </Body>                  
                  <Right style={{flex: 1}}>
                    <Button danger>
                      <Icon name="close" />
                    </Button>                  
                  </Right>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <CafeMenuImage source={{ uri: menu.image }} />
                  </Body>
                </CardItem>
                <CardItem>
                  <Right style={{ flex: 1 }}>
                    <NumberFormat style={{ fontSize: 20 }} number={menu.price} />
                  </Right>
                </CardItem>
                <CardItem>
                  <OptionView>
                    <OptionButton danger={isHot} light={!isHot} onPress={() => {
                      this.changeOrderValue(orderIndex, 'beverageType', BeverageType.HOT);
                    }}>
                      <Text>Hot</Text>
                    </OptionButton>
                    <OptionButton primary={!isHot} light={isHot} onPress={() => {
                      this.changeOrderValue(orderIndex, 'beverageType', BeverageType.ICE);
                    }}>
                      <Text>Ice</Text>
                    </OptionButton>
                  </OptionView>
                </CardItem>
                <CardItem>
                  <OptionView>
                    {this.renderShotCountOptions(orderIndex, menuItem)}
                  </OptionView>
                </CardItem>
                <CardItem>
                  <Form style={{ flex: 1 }}>
                    <Item>
                      <Label>요청사항</Label>
                      <Input value={menu.orderRequest}
                        onChangeText={(text) => this.changeOrderValue(orderIndex, 'orderRequest', text)} />
                    </Item>
                  </Form>
                </CardItem>
              </Card>
            )
          })}
          <Card>
            <CardItem>
              <Right style={{ flex: 1 }}>
                <Text>총 금액</Text>
                <NumberFormat style={{ fontSize: 35 }} number={totalPrice} />
              </Right>
            </CardItem>
          </Card>
          <Button style={{marginBottom: 15}} iconLeft block onPress={this.handleOrder}>
            <Icon name="cafe" />
            <Text>주문하기</Text>
          </Button>
        </Content>
      </ScreenComponent>
    );
  }
}