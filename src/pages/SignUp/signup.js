import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { userService } from "../../services/user-service";


export default class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    name: "",
    nickName: "",
    error: null
  };

  signUp() {
    const usermodel = {
      email: this.state.username,
      password: this.state.password,
      name: this.state.name,
      nickName: this.state.nickName
    }

    userService.signUp(usermodel).then(credential => {

    }).catch(errorMessage => {
      this.setState({ error: errorMessage })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          {
            this.state.error ? <View><Text style={{ color: "red", textAlign: "center" }}>{this.state.error}</Text></View> : null
          }

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

          <Button title={"Sign Up"} onPress={() => {
            this.setState({
              error: null
            }, () => this.signUp())
          }} />
        </View>
      </View>
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
