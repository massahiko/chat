import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Signup from './src/pages/SignUp/signup';
import Login from './src/pages/Login/login';
import Chat from './src/pages/chat/chat';
import LoginState from './src/pages/LoginState/login-state';

var signUpStack = createStackNavigator({
  LoginStateScreen: LoginState,
  LoginScreen: Login,
  SignUpScreen: Signup,
  ChatScreen: Chat,
});

var chatStack = createStackNavigator({
  ChatScreen: Chat,
});

var rootNavigation = createSwitchNavigator({
  SignupStack: signUpStack,
  ChatStack: chatStack,
});

export default rootNavigation;



