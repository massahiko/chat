import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { userService } from "../../services/user-service";
import Loading from "../../shared/components/loading";

export default class LoginSignUp extends React.Component {
  static navigationOptions = (navigation) => {
    return {
      title: "Sign Up"
    }
  }
  state = {
    username: "",
    password: "",
    name: "",
    nickName: "",
    error: null,
    loading: false
  };

  signUp() {
    const usermodel = {
      email: this.state.username,
      password: this.state.password,
      name: this.state.name,
      nickName: this.state.nickName
    }

    userService.signUp(usermodel)
      .then(credential => {
        this.showHideLoading(false);
      }).catch(errorMessage => {
        this.showHideLoading(false);
        this.setState({
          error: errorMessage
        })
      });
  }

  showHideLoading(visible = true) {
    setTimeout(() => {
      this.setState({
        loading: visible
      })
    }, 1500);
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
            onChangeText={username => {
              this.setState({ username });
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

          <TextInput
            style={styles.textInput}
            placeholder={"Name"}
            autoCapitalize={"none"}
            onChangeText={name => {
              this.setState({ name });
            }}
          />
          <TextInput />

          <TextInput
            style={styles.textInput}
            placeholder={"Nick Name"}
            autoCapitalize={"none"}
            onChangeText={nickName => {
              this.setState({ nickName });
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
          <Button title={"Sign Up"}
            onPress={() => {
              this.setState({
                error: null,
                loading: true
              }, () => this.signUp())
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
