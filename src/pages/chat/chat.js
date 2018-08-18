import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import ChatMessage from '../../shared/components/chat-message';
import { KeyboardAvoidingView } from 'react-native';
import { userService } from '../../services/user-service'

export default class Chat extends React.Component {
    state = {
        message: "",
        messages: [],
        canSendMessage: false
    }

    componentDidMount() {
        userService.
            getMessage()
            .on("value", (snapshot) => {
                //var messagesObject = snapshot.val();
                var messages = [];

                // for (var uid in messagesObject) {
                //     messages.push({
                //         ...messagesObject[uid],
                //         id: uid
                //     });
                // }
                // console.log(messages)

                snapshot.forEach(item => {
                    messages.push({
                        ...item.val(),
                        uid: item.key
                    });
                })

                this.setState({
                    messages
                })
                console.log("messages", messages);

            })
    }

    sendMessage() {
        userService.sendMessage(this.state.message).then(() => {
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
                        renderItem={({ item }) => <ChatMessage message={item} />}
                        keyExtractor={(item) => item.uid} />
                </View>
                {/* <KeyboardAvoidingView enabled behavior="padding" keyboardVerticalOffset={100} style={{
                    height: 40,
                    width: "100%"
                }}> */}
                <KeyboardAvoidingView enabled behavior="padding" keyboardVerticalOffset={80} style={{
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