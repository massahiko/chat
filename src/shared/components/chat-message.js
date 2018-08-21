import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ChatMessage extends React.Component {

    render() {
        var messageFromMe = this.props.fromMe;
        return (
            <View style={[
                styles.messageContainer,
                messageFromMe ? styles.messageContainerfromMe : null
            ]}>
                {/* Image */}
                <View style={styles.chatImage}>
                    <View></View>
                </View>
                <View style={[
                    styles.chatMessage,
                    messageFromMe ? styles.chatMessageFromMe : null]}>
                    {/* Message */}
                    <View>
                        {/* Nickname */}
                        <View></View>

                        {/* Message */}
                        <View>
                            <Text>{this.props.message.message}</Text>
                            <Text style={{ fontSize: 10 }}>{this.props.message.date}</Text>
                        </View>

                        {/* Date */}
                        <View></View>
                    </View>
                </View>
            </View>
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

    messageContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        paddingTop: 10,
        marginBottom: 15
    },

    chatMessage: {
        width: "70%",
        backgroundColor: "lightgreen",
        borderRadius: 5,
        padding: 12,
        marginLeft: 15
    },

    chatMessageFromMe: {
        marginLeft: 0,
        marginRight: 15,
        backgroundColor: "lightblue"
    },

    messageContainerfromMe: {
        flexDirection: "row-reverse"
    },

    chatImage: {
        width: 60,
        height: 60,
        borderRadius: 500,
        backgroundColor: "blue"
    }
});