import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Signup from './src/pages/SignUp/signup';
import Login from './src/pages/Login/login';
import Chat from './src/pages/chat/chat';

var signUpStack = createStackNavigator({
  LoginScreen: Login,
  SignUpScreen: Signup,
  ChatScreen: Chat
});

var chatStack = createStackNavigator({
  ChatScreen: Chat
});

var rootNavigation = createSwitchNavigator({
  ChatStack: chatStack,
  SignupStack: signUpStack
})

export default rootNavigation;



