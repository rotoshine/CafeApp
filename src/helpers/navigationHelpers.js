import { NavigationActions } from 'react-navigation';

function navigationResetAndMoveScreen(navigation, moveScreenName) {
  navigation.dispatch(
    NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: moveScreenName })
      ]
    })
  );
}

export {
  navigationResetAndMoveScreen  
}