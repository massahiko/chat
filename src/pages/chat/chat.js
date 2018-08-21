import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import ChatMessage from '../../shared/components/chat-message';
import { KeyboardAvoidingView } from 'react-native';
import { userService } from '../../services/user-service'
import { Ionicons } from '@expo/vector-icons';

export default class Chat extends React.Component {

static navigationOptions = ({navigation}) => {
    return {
        headerRight: navigation.getParam("headerRight", null)
    }
}

    state = {
        message: "",
        messages: [],
        canSendMessage: false,
        user: []
    }

    logout() {
        userService.logout().then(response => {
            this.props.navigation.navigate("SignupStack");
        })
    }

    componentDidMount() {
        this.props.navigation.setParams(
            {
                headerRight: <TouchableOpacity 
                             title={"Logout"} 
                             color= {"green"} 
                             onPress={() => {
                                 this.logout();
                            }}>
                                <Ionicons name="md-exit" size={32} />    
                            </TouchableOpacity>
                            

            }
        )
        userService.getUser().then(user => {
            this.setState({
                user: user
            }, () => { this.getMessages() })
        })
    }

    getMessages() {
        userService.
            getMessage()
            .on("value", (snapshot) => {
                var messages = [];

                snapshot.forEach(item => {
                    messages.push({
                        ...item.val(),
                        messageid: item.key
                    });
                })

                this.setState({
                    messages
                })
            })
    }

    sendMessage() {
        userService.sendMessage(this.state.message)
            .then(() => {
                this.setState({
                    message: "",
                    canSendMessage: false
                });
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, width: "100%" }}>
                    <FlatList
                        ref={(ref) => {
                            this.FlatList = ref;
                        }}
                        data={this.state.messages}
                        onContentSizeChange={() => this.FlatList.scrollToEnd({ animated: true })}
                        renderItem={({ item }) => <ChatMessage message={item} fromMe={item.uid == this.state.user.uid} />}
                        keyExtractor={(item) => item.messageid} />
                </View>
                /* <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? "padding" : null} keyboardVerticalOffset={80} style={{ 
                    height: 50,
                    width: "100%",
                    paddingLeft: 15,
                    paddingRight: 15,
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }} >
                        <View style={{
                            marginBottom: 10,
                            height: 40,
                            flexGrow: 1,
                        }}>
                            <TextInput style={{
                                height: 40,
                                borderColor: 'black',
                                borderWidth: 1
                            }}
                                onChangeText={(message) =>
                                    this.setState({
                                        message,
                                        canSendMessage: message != ''
                                    })}

                                value={this.state.message}
                            />
                        </View>
                        <View style={{
                            marginBottom: 10,
                            height: 40
                        }}>
                            <Button
                                title={"Enviar"}
                                disabled={this.state.canSendMessage == false}
                                onPress={() => {
                                    this.setState({
                                        canSendMessage: false
                                    }, () => {
                                        this.sendMessage();
                                    })
                                }} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
                {/* </KeyboardAvoidingView> */}
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});