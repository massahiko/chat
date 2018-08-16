import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import ChatMessage from '../../shared/components/chat-message';
import { KeyboardAvoidingView } from 'react-native';

export default class Chat extends React.Component {

    render() {
        var messages = [
            {
                id: 1,
                message: "Minha Mensagem",
                nickname: "alexIshihara",
                date: new Date().toISOString(),
                fromMe: true
            },

            {
                id: 2,
                message: "Minha louca",
                nickname: "alexIshihara",
                date: new Date().toISOString(),
                fromMe: false
            }
        ]

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, width: "100%" }}>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => <ChatMessage fromMe={item.fromMe}
                            message={item} />}
                        keyExtractor={(item) => item.id.toString()} />
                </View>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} enabled style={{
                    height: 40,
                    width: "100%"
                }}>
                    <TextInput style={{
                        height: 40,
                        borderColor: 'black',
                        borderWidth: 1
                    }}
                        onChangeText={(message) => this.setState({ message })} />>
                </KeyboardAvoidingView>
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