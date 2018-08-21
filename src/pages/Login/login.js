import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { userService } from "../../services/user-service";
import Loading from "../../shared/components/loading";


export default class Login extends React.Component {
  static navigationOptions = (navigation) => {
    return {
      header: null
    }
  }
  state = {
    email: "",
    password: "",
    error: null,
    loading: false
  };

  login() {
    userService
      .login(this.state.email, this.state.password)
      .then(credentials => {
        console.log(credentials);
        this.showHideLoading(false);
        this.props.navigation.navigate("ChatStack");
      }).catch(error => {
        console.log(error.message);
        this.showHideLoading(false);
      })
  }

  showHideLoading(visible = true) {
    //setTimeout(() => {
    this.setState({
      loading: visible
    })
    //}, 1500);
  }

  render() {
    return (

      <Loading loading={this.state.loading}>
        <View style={styles.logoContainer} >
          <View style={styles.logo} />
        </View>

        <View>
          <TextInput
            style={styles.textInput}
            placeholder={"User Name"}
            autoCapitalize={"none"}
            onChangeText={email => {
              this.setState({ email });
            }}
          />
          <TextInput />

          <TextInput
            style={styles.textInput}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={password => {
              this.setState({ password });
            }}
          />
          <TextInput />

          {
            this.state.error ?
              <View>
                <Text style={{
                  color: "red",
                  textAlign: "center"
                }
                }>{this.state.error}
                </Text>
              </View>
              : null
          }
          <Button title={"Login"}
            onPress={() => {
              this.setState({
                error: null,
                loading: true
              }, () => this.login())
            }} />

          <Button title={"Cadastre-se"}
            onPress={() => {
              this.props.navigation.navigate("SignUpScreen");
            }} />
        </View>
      </Loading>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  logoContainer: {},

  logo: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    borderWidth: 1,
    borderRadius: 500,
    marginBottom: 30
  },

  textInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 2,
    width: 250,
    paddingLeft: 10
  }
});
