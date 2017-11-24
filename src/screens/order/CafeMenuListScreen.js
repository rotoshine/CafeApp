import React, { Component } from 'react';
import { Platform, Dimensions, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  Button,
  Badge,
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
  Tabs,
  Tab,
  ScrollableTab,
  Toast
} from 'native-base';

import styled from 'styled-components/native';

import ScreenComponent from '../ScreenComponent';

import { categories, cafeMenus } from '../../../data/data';

import CafeMenuImage from './CafeMenuImage';

const CafeMenuWrapperView = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;
const CafeMenuView = styled.View`    
  width: 50%
`;

const CardItemHeader = styled(CardItem)`
  flex: 1;  
  justify-content: center
`;

const CardItemFooter = styled(CardItem)`
  
`;
export default class CafeMenuListScreen extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedMenuIds: [],
      selectedCategory: 1
    };
  }
  
  selectMenu (id) {
    const nextselectedMenuIds = [...this.state.selectedMenuIds, id];

    this.setState({
      selectedMenuIds: nextselectedMenuIds
    });
  }

  renderMenus () {
    const { selectedCategory } = this.state;
    const { navigation } = this.props;

    const filteredMenus = cafeMenus.filter((menu) => menu.category === selectedCategory);
    if (filteredMenus.length === 0){
      return (
        <Card>
          <CardItem>
            <Body>
              <Text>해당 카테고리에 해당하는 메뉴가 없네요 :(</Text>
            </Body>
          </CardItem>
        </Card>
      );
    }

    return filteredMenus.map((menu, i) => {
      return (    
        <CafeMenuView key={i}>       
          <Card>
            <CardItemHeader>            
              <Text>{menu.name}</Text>                          
            </CardItemHeader>
            <CardItem cardBody>
              <Body>                
                <CafeMenuImage source={{uri: menu.image}} />
              </Body>
            </CardItem>          
            <CardItem>
              <Right style={{flex: 1}}>            
                <Text>{menu.price}원</Text>            
              </Right>
            </CardItem>
            <CardItem footer>            
              <Body style={{flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Button style={{marginRight: 5}} onPress={() => this.selectMenu(menu.id)}>
                    <Text>담기</Text>
                  </Button>              
                  <Button onPress={() => navigation.navigate('Order', { selectedMenuIds: [menu.id]})}>
                    <Text>바로주문</Text>
                  </Button>
                </View>            
              </Body>
            </CardItem>
          </Card>
        </CafeMenuView>
      );
    });
  }

  handleMoveOrderScreen = () => {
    const { navigation } = this.props;
    const { selectedMenuIds } = this.state; 

    if (selectedMenuIds.length === 0) {
      Toast.show({
        text: '메뉴를 선택해주세요.',
        position: 'top',
        buttonText: '알겠어요'
      });
    } else {
      navigation.navigate('Order', {
        selectedMenuIds: [...selectedMenuIds]
      });

      this.setState({
        selectedMenuIds: []
      });
    }
    
  };

  render () {
    const { selectedCategory, selectedMenuIds } = this.state;    
    const { navigation } = this.props;
    const menus = [];  

    const headerRight = (
      <Button iconLeft 
              transparent 
              onPress={this.handleMoveOrderScreen}>
        <Badge info>
          <Text>{selectedMenuIds.length}</Text>
        </Badge>
        <Icon name="cart" />
      </Button>
    )
    return (
      <ScreenComponent title="Cafe Menu"
        navigation={navigation}
        headerRight={headerRight}
      >
        
        <Tabs renderTabBar={() => <ScrollableTab />}
              onChangeTab={({ i }) => {
                this.setState({ selectedCategory: categories[i].id });
              }}>
          {categories.map((category, i) => {
            return (
              <Tab key={i}
                   heading={category.name}
                   active={selectedCategory === category.id}>                
                   <Content>
                     <CafeMenuWrapperView>                            
                        {this.renderMenus()}                                          
                      </CafeMenuWrapperView>
                  </Content>
              </Tab>
            )
          })}
        </Tabs>        
      </ScreenComponent>
    );
  }
}