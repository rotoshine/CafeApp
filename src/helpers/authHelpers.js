import { Alert, AsyncStorage } from "react-native";
import Expo from "expo";

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "react-native-dotenv";

const { alert } = Alert;

const USER_STORAGE_KEY = "@SmartStudyCafe:user";

async function signInWithGoogleAsync(email, password) {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: ANDROID_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      scopes: ["profile", "email"]
    });

    if (result.type === 'success') {
      await saveUser(result);
      return result;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return {
      error: true,
      message: e.message
    };
  }
}

async function logout() {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function loadUser() {
  try {
    const userJSONString = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (userJSONString !== null) {
      return JSON.parse(userJSONString);
    }
  } catch (err) {
    alert(err.message);
  }

  return null;
}

async function saveUser(user) {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export { signInWithGoogleAsync, logout, loadUser, saveUser };
