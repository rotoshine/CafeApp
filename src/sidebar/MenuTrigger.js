import React from 'react';
import { Platform } from 'react-native';
import { Button, Icon } from 'native-base';

const MenuTrigger = ({ navigation }) => {
  if (Platform.OS !== 'android') {
    return null;
  }
  return (
    <Button transparent
      onPress={() => navigation.navigate('DrawerOpen')}>
      <Icon name="menu" />
    </Button>
  );
}

export default MenuTrigger;