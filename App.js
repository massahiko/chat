import { createStackNavigator } from 'react-navigation'
import Signup from './src/pages/SignUp/signup'
import Login from './src/pages/Login/login'

var stack = createStackNavigator({
  LoginScreen: Login,
  SignUpScreen: Signup
});

export default stack;

