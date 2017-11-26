import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Button, Text, Icon, Toast } from 'native-base';
import styled from 'styled-components/native';
import Spinner from 'react-native-loading-spinner-overlay';

import { signInWithGoogleAsync, loadUser } from '../../helpers/authHelpers';
import { navigationResetAndMoveScreen } from '../../helpers/navigationHelpers';

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
export default class LoginScreen extends Component {
  constructor (props) {
    super(props);

    this.state = {
      nowLoginRequest: false
    };
  }
  async componentWillMount () {
    const loginedUser = await loadUser();

    if (loginedUser !== null) {
      this.moveAppMain();
    }
  }
  
  async asyncSetState(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  moveAppMain () {
    navigationResetAndMoveScreen(this.props.navigation, 'App');      
  }

  async login() {    
    await this.asyncSetState({ nowLoginRequest: true });
    const result = await signInWithGoogleAsync();

    if (result) {          
      if (result.type === 'success') {                
        this.moveAppMain();     
      } else if(result.cancelled) {
        Toast.show({ 
          text: '로그인을 취소하였습니다.', 
          duration: 3000, 
          position: 'bottom' 
        });
      } else if(result.error) {
        Toast.show({
          text: `error: ${result.error.message}`,
          duration: 3000,
          position: 'bottom',
          type: 'danger'
        });
      }
    }

    this.setState({ nowLoginRequest: false });
  }

  render() {
    const { nowLoginRequest } = this.state;

    return (      
      <MainView>
        <Spinner visible={nowLoginRequest} size="large" />
        <CafeMainImage source={require('../../images/cafe.jpg')}>
          <Button iconLeft block large onPress={() => this.login()}>
            <Icon name="logo-google" />
            <Text>로그인</Text>
          </Button>
        </CafeMainImage>
      </MainView>
    );
  }
}