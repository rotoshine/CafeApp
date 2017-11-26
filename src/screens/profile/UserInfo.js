import React from 'react';
import styled from 'styled-components/native';

import { 
  Card, 
  CardItem, 
  Title, 
  Text, 
  Button, 
  Form, 
  Item,
  Label, 
  Icon, 
  Body 
} from 'native-base';

const UserProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: contain;
`;

const UserInfo = ({ user, onLogout }) => (
  <Card>
    <CardItem>
      <UserProfileImage source={{ uri: user.photoUrl }} />
      <Form>
        <Item inlineLabel>
          <Label>Name</Label>
          <Text>{user.name}</Text>
        </Item>
        <Item inlineLabel>
          <Label>Email</Label>
          <Text>{user.email}</Text>
        </Item>
      </Form>
    </CardItem>
    <CardItem>
      <Body>
        <Button iconLeft block onPress={onLogout}>
          <Icon name="log-out" />
          <Text>Logout</Text>
        </Button>
      </Body>
    </CardItem>
  </Card>
);

export default UserInfo;