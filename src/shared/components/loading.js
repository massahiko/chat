import React from "react";
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default class Loading extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.loading
                        ? <ActivityIndicator size="large" color="#0000ff" />
                        : this.props.children
                }
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
    }
});
